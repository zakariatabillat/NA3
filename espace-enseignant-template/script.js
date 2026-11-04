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

// function creerLigne(eleve){
//     const li=document.createElement("li");
//     const nom=document.createElement("span");
//     const absences=document.createElement("span");
//     const spanMoyenne=document.createElement("span")
//     absences.classList.add("block","text-sm","text-muted")
//     absences.textContent=`${eleve.absences} absences`
//    spanMoyenne.textContent = formaterMoyenne(calculerMoyenne(eleve.notes));
//    spanMoyenne.classList.add("font-serif","text-xl")
//     nom.textContent=`${eleve.prenom} ${eleve.nom}`
//     li.classList.add("bg-card","rounded-2xl", "border", "border-line","p-3");

//     li.append(nom,absences,spanMoyenne);
//     return li;

// }
// const lignes=eleves.map(creerLigne);
// liste.append(...lignes);


// ```javascript
// function creerLigne(eleve){
//     const li=document.createElement("li");
//     const nom=document.createElement("span");
//     const absences=document.createElement("span");
//     const spanMoyenne=document.createElement("span")
//     absences.classList.add("block","text-sm","text-muted")
//     absences.textContent=`${eleve.absences} absences`
//    spanMoyenne.textContent = formaterMoyenne(calculerMoyenne(eleve.notes));
//    spanMoyenne.classList.add("font-serif","text-xl")
//     nom.textContent=`${eleve.prenom} ${eleve.nom}`
//     li.classList.add("bg-card","rounded-2xl", "border", "border-line","p-3");

//     li.append(nom,absences,spanMoyenne);
//     li.dataset.id = eleve.id;
//     const btnAbsent=document.createElement("button");
//     const inputNote=document.createElement("input");
//     const btnNote=document.createElement("button");
//     btnNote.textContent="Ajouter la note";
//     btnNote.classList.add("btn-note");
   
//     inputNote.type="number";
//     li.append(inputNote);
//      li.append(btnNote);
//     inputNote.placeholder="Note";
//     btnAbsent.textContent="Absent";
//     li.append(btnAbsent);
//     btnAbsent.classList.add("btn-absent");
//     if (eleve.absences>=3) {
//     li.classList.add("alerte");
//     const badge=document.createElement("span");
//     badge.textContent="Prévenir les parents";
//     absences.append(badge)
//     badge.classList.add("badge", "ml-1", "whitespace-nowrap", "rounded-full", "bg-alert", "px-2", "py-0.5", "text-xs", "font-medium", "text-white")
// }
    
//     return li;

// } here is the whole code arrange them and send me back the function
// ```