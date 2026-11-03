const liste=document.getElementById("liste-eleves");
const compteur=document.getElementById("compteur");
compteur.textContent=`${eleves.length} élèves`

function calculerMoyenne(notes){
    if(notes.length===0) return null;
    let total=0;
    for(let note of notes){
      total+=note;  
    }
    return total/notes.length;

}
// console.log(calculerMoyenne(eleves[5].notes));

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
const lignes=eleves.map(creerLigne);
liste.append(...lignes);