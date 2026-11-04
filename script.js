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

function creerLigne(eleve){
    const li=document.createElement("li");
    const nom=document.createElement("span");
    const absences=document.createElement("span");
    const spanMoyenne=document.createElement("span")
    absences.classList.add("block","text-sm","text-muted")
    absences.textContent=`${eleve.absences} absences`
   spanMoyenne.textContent = formaterMoyenne(calculerMoyenne(eleve.notes));
   spanMoyenne.classList.add("font-serif","text-xl")
    nom.textContent=`${eleve.prenom} ${eleve.nom}`
    li.classList.add("bg-card","rounded-2xl", "border", "border-line","p-3");

    li.append(nom,absences,spanMoyenne);
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


