const liste=document.getElementById("liste-eleves");
const compteur=document.getElementById("compteur");
const aucunResultat=document.getElementById("aucun-resultat");

function calculerMoyenne(notes){
    if(notes.length===0) return null;
    let total=0;
    for(let note of notes){
      total+=note;  
    }
    return total/notes.length;

}
// console.log(calculerMoyenne(eleves[5].notes));
// console.log(aucunResultat);


function formaterMoyenne(moyenne) {
  if (moyenne === null) return "—";
  const arrondie = Math.round(moyenne * 10) / 10;
  return `${arrondie} / 20`;
}

function creerLigne(eleve) {
  const li = document.createElement("li");
  li.classList.add("bg-card", "rounded-2xl", "border", "border-line", "p-3");
  li.dataset.id = eleve.id;

  const nom = document.createElement("span");
  nom.textContent = `${eleve.prenom} ${eleve.nom}`;

  const absences = document.createElement("span");
  absences.classList.add("block", "text-sm", "text-muted");
  absences.textContent = `${eleve.absences} absences`;

  const spanMoyenne = document.createElement("span");
  spanMoyenne.classList.add("font-serif", "text-xl");
  spanMoyenne.textContent = formaterMoyenne(calculerMoyenne(eleve.notes));

  const btnAbsent = document.createElement("button");
  btnAbsent.textContent = "Absent";
  btnAbsent.classList.add("btn-absent");

  const inputNote = document.createElement("input");
  inputNote.type = "number";
  inputNote.placeholder = "Note";

  const btnNote = document.createElement("button");
  btnNote.textContent = "Ajouter la note";
  btnNote.classList.add("btn-note");

  if (eleve.absences >= 3) {
    li.classList.add("alerte");

    const badge = document.createElement("span");
    badge.textContent = "Prévenir les parents";
    badge.classList.add("badge", "ml-1", "whitespace-nowrap", "rounded-full", "bg-alert",
                        "px-2", "py-0.5", "text-xs", "font-medium", "text-white");
    absences.append(badge);
  }

  li.append(nom, absences, spanMoyenne, btnAbsent, inputNote, btnNote);
  return li;
}

function afficher(listeEleves) {
  const lignes = listeEleves.map(creerLigne);
  liste.replaceChildren(...lignes);
  compteur.textContent=`${listeEleves.length} élèves`;
  aucunResultat.hidden= listeEleves.length > 0;

}



const filterGroup = document.getElementById("filtre-groupe");

function creerOption(groupe) {
  const option = document.createElement("option");
  option.textContent = groupe.nom;
  option.value = groupe.id;
  return option;
}
const options = groupes.map(creerOption);
filterGroup.append(...options);

function filtrer() {
  const texte = recherche.value.toLowerCase();
  
  const elevesFiltres = eleves.filter((eleve) => {
    const nomComplet=`${eleve.nom} ${eleve.prenom}`.toLowerCase();
    const nomOK=nomComplet.includes(texte);
    const groupeOK= filterGroup.value === "" || eleve.groupeId === Number(filterGroup.value);
    
    return groupeOK && nomOK;
  });
  afficher(elevesFiltres);
}

filterGroup.addEventListener("change", () => {
  filtrer();
});

afficher(eleves);


const recherche=document.getElementById("recherche");
recherche.addEventListener("input",()=>{
   filtrer();
 
})

liste.addEventListener("click", (e) => {
const btnAbsent=e.target.closest(".btn-absent");
const btnNote = e.target.closest(".btn-note");
if (btnAbsent === null && btnNote===null) return;
const ligne = e.target.closest("li");
const id=Number(ligne.dataset.id);
const eleve=eleves.find((el)=>{
  return el.id===id;
})
 if (btnAbsent !== null) {
  eleve.absences++;
}
if (btnNote !== null) {
const champ=ligne.querySelector("input");
const note=Number(champ.value);
console.log(note);


}
ligne.replaceWith(creerLigne(eleve));
}
)
















