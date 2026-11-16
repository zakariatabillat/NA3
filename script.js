
const liste = document.getElementById("liste-eleves");
const compteur = document.getElementById("compteur");
const aucunResultat = document.getElementById("aucun-resultat");
const recherche = document.getElementById("recherche");
const filterGroup = document.getElementById("filtre-groupe");
const tri = document.getElementById("tri");

const SEUIL_ALERTE = 3;      
const MAX_PAR_GROUPE = 15;   



function calculerMoyenne(notes) {
  if (notes.length === 0) return null;
  let total = 0;
  for (let note of notes) {
    total += note;
  }
  return total / notes.length;
}

// 13.5 -> "13,5"
function formaterNombre(nombre) {
  const arrondi = Math.round(nombre * 10) / 10;
  return String(arrondi).replace(".", ",");
}

function formaterMoyenne(moyenne) {
  if (moyenne === null) return "—";
  return `${formaterNombre(moyenne)} / 20`;
}

function trouverGroupe(id) {
  return groupes.find((g) => g.id === id);
}

function estEnAlerte(eleve) {
  return eleve.absences >= SEUIL_ALERTE;
}



function creerLigne(eleve) {
  const alerte = estEnAlerte(eleve);

  const li = document.createElement("li");
  li.classList.add("rounded-2xl", "border", "border-line", "bg-card", "p-3");
  if (alerte) li.classList.add("alerte");
  li.dataset.id = eleve.id;

  const conteneur = document.createElement("div");
  conteneur.classList.add("flex", "flex-col", "gap-3", "lg:flex-row", "lg:items-center");

  // --- Partie gauche : bouton qui ouvre la fiche ---
  const btnFiche = document.createElement("button");
  btnFiche.type = "button";
  btnFiche.classList.add("btn-fiche", "flex", "min-h-11", "flex-1", "items-center", "gap-3", "text-left");

  const initiales = document.createElement("span");
  initiales.classList.add("grid", "size-10", "shrink-0", "place-items-center", "rounded-full", "text-sm", "font-semibold");
  if (alerte) {
    initiales.classList.add("bg-alert", "text-white");
  } else {
    initiales.classList.add("bg-brand-soft", "text-brand");
  }
  initiales.textContent = `${eleve.prenom[0]}${eleve.nom[0]}`.toUpperCase();

  const infos = document.createElement("span");
  infos.classList.add("min-w-0", "flex-1");

  const nom = document.createElement("span");
  nom.classList.add("block", "truncate", "font-medium");
  nom.textContent = `${eleve.prenom} ${eleve.nom}`;

  const absences = document.createElement("span");
  absences.classList.add("block", "text-sm", "text-muted");
  absences.textContent = eleve.absences > 1 ? `${eleve.absences} absences` : `${eleve.absences} absence`;

  if (alerte) {
    const badge = document.createElement("span");
    badge.textContent = "Prévenir les parents";
    badge.classList.add("badge", "ml-1", "whitespace-nowrap", "rounded-full", "bg-alert",
                        "px-2", "py-0.5", "text-xs", "font-medium", "text-white");
    absences.append(" ", badge);
  }

  infos.append(nom, absences);

  const spanMoyenne = document.createElement("span");
  spanMoyenne.classList.add("font-serif", "text-xl");
  spanMoyenne.textContent = formaterMoyenne(calculerMoyenne(eleve.notes));

  btnFiche.append(initiales, infos, spanMoyenne);

  // --- Partie droite : Absent + note ---
  const actions = document.createElement("div");
  actions.classList.add("flex", "gap-2");

  const btnAbsent = document.createElement("button");
  btnAbsent.type = "button";
  btnAbsent.textContent = "Absent";
  btnAbsent.classList.add("btn-absent", "h-11", "rounded-full", "border", "border-line", "px-3", "sm:px-4",
                          "text-sm", "font-medium", "hover:bg-paper");
  if (alerte) btnAbsent.classList.add("bg-card");

  const label = document.createElement("label");
  label.classList.add("flex-1");

  const labelTexte = document.createElement("span");
  labelTexte.classList.add("sr-only");
  labelTexte.textContent = "Note sur 20";

  const inputNote = document.createElement("input");
  inputNote.type = "number";
  inputNote.min = "0";
  inputNote.max = "20";
  inputNote.step = "0.5";
  inputNote.placeholder = "Note";
  inputNote.classList.add("h-11", "w-full", "rounded-full", "border", "border-line", "px-4", "text-sm", "lg:w-24");
  inputNote.classList.add(alerte ? "bg-card" : "bg-paper");

  label.append(labelTexte, inputNote);

  const btnNote = document.createElement("button");
  btnNote.type = "button";
  btnNote.textContent = "Ajouter la note";
  btnNote.classList.add("btn-note", "h-11", "rounded-full", "bg-ink", "px-3", "sm:px-4", "text-sm",
                        "font-medium", "text-white", "hover:bg-brand");

  actions.append(btnAbsent, label, btnNote);
  conteneur.append(btnFiche, actions);

  const message = document.createElement("p");
  message.classList.add("message", "mt-2", "text-xs", "text-alert");
  message.textContent = "La note doit être un nombre entre 0 et 20.";
  message.hidden = true;

  li.append(conteneur, message);
  return li;
}



const bilanMoyenne = document.getElementById("bilan-moyenne");
const bilanAbsences = document.getElementById("bilan-absences");
const bilanAlertes = document.getElementById("bilan-alertes");
const bilanMeilleur = document.getElementById("bilan-meilleur");
const listeParents = document.getElementById("liste-parents");
const aucuneAlerte = document.getElementById("aucune-alerte");

function afficherBilan(listeEleves) {
  // Moyenne du groupe : moyenne des élèves qui ont des notes
  const moyennes = listeEleves
    .map((el) => calculerMoyenne(el.notes))
    .filter((m) => m !== null);
  const moyenneGroupe = calculerMoyenne(moyennes);
  bilanMoyenne.textContent = moyenneGroupe === null ? "—" : formaterNombre(moyenneGroupe);

  // Total des absences
  let totalAbsences = 0;
  for (let eleve of listeEleves) {
    totalAbsences += eleve.absences;
  }
  bilanAbsences.textContent = totalAbsences;

  // Alertes
  const enAlerte = listeEleves.filter(estEnAlerte);
  bilanAlertes.textContent = enAlerte.length;

  // Meilleure moyenne (B4)
  let meilleur = null;
  for (let eleve of listeEleves) {
    const moyenne = calculerMoyenne(eleve.notes);
    if (moyenne === null) continue;
    if (meilleur === null || moyenne > calculerMoyenne(meilleur.notes)) {
      meilleur = eleve;
    }
  }
  bilanMeilleur.textContent = meilleur === null
    ? "—"
    : `${meilleur.prenom} ${meilleur.nom} — ${formaterMoyenne(calculerMoyenne(meilleur.notes))}`;

  // Parents à appeler
  const lignesParents = enAlerte.map((eleve) => {
    const li = document.createElement("li");
    li.classList.add("rounded-xl", "bg-card", "px-3", "py-2", "ring-1", "ring-line");
    li.textContent = `${eleve.prenom} ${eleve.nom} — ${eleve.telephoneParent}`;
    return li;
  });
  listeParents.replaceChildren(...lignesParents);
  aucuneAlerte.hidden = enAlerte.length > 0;
}


function afficher(listeEleves) {
  const lignes = listeEleves.map(creerLigne);
  liste.replaceChildren(...lignes);
  compteur.textContent = listeEleves.length > 1 ? `${listeEleves.length} élèves` : `${listeEleves.length} élève`;
  aucunResultat.hidden = listeEleves.length > 0;
  afficherBilan(listeEleves);
}



function creerOption(groupe) {
  const option = document.createElement("option");
  option.textContent = groupe.nom;
  option.value = groupe.id;
  return option;
}
filterGroup.append(...groupes.map(creerOption));

function trier(listeEleves) {
  const copie = [...listeEleves]; 

  if (tri.value === "nom") {
    copie.sort((a, b) => `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`, "fr"));
  }

  if (tri.value === "moyenne") {
    copie.sort((a, b) => {
      const ma = calculerMoyenne(a.notes);
      const mb = calculerMoyenne(b.notes);
      if (ma === null) return 1;   
      if (mb === null) return -1;
      return mb - ma;              
    });
  }

  return copie;
}

function filtrer() {
  const texte = recherche.value.trim().toLowerCase();

  const elevesFiltres = eleves.filter((eleve) => {
    const nomComplet = `${eleve.prenom} ${eleve.nom}`.toLowerCase();
    const nomInverse = `${eleve.nom} ${eleve.prenom}`.toLowerCase();
    const nomOK = nomComplet.includes(texte) || nomInverse.includes(texte);
    const groupeOK = filterGroup.value === "" || eleve.groupeId === Number(filterGroup.value);
    return groupeOK && nomOK;
  });

  afficher(trier(elevesFiltres));
}

recherche.addEventListener("input", filtrer);
filterGroup.addEventListener("change", filtrer);
tri.addEventListener("change", filtrer);



const fiche = document.getElementById("fiche");
const ficheNom = document.getElementById("fiche-nom");
const ficheGroupe = document.getElementById("fiche-groupe");
const ficheNotes = document.getElementById("fiche-notes");

function ouvrirFiche(eleve) {
  const groupe = trouverGroupe(eleve.groupeId);
  ficheNom.textContent = `${eleve.prenom} ${eleve.nom}`;
  ficheGroupe.textContent = groupe ? `${groupe.nom} — ${groupe.cours}` : "";

  if (eleve.notes.length === 0) {
    const li = document.createElement("li");
    li.classList.add("text-sm", "text-muted");
    li.textContent = "Aucune note pour le moment.";
    ficheNotes.replaceChildren(li);
  } else {
    const items = eleve.notes.map((note) => {
      const li = document.createElement("li");
      li.classList.add("rounded-full", "bg-paper", "px-3", "py-1");
      li.textContent = formaterNombre(note);
      return li;
    });
    ficheNotes.replaceChildren(...items);
  }

  fiche.showModal();
}

liste.addEventListener("click", (e) => {
  const btnAbsent = e.target.closest(".btn-absent");
  const btnNote = e.target.closest(".btn-note");
  const btnFiche = e.target.closest(".btn-fiche");
  if (btnAbsent === null && btnNote === null && btnFiche === null) return;

  const ligne = e.target.closest("li[data-id]");
  const id = Number(ligne.dataset.id);
  const eleve = eleves.find((el) => el.id === id);

  if (btnFiche !== null) {
    ouvrirFiche(eleve);
    return;
  }

  if (btnAbsent !== null) {
    eleve.absences++;
  }

  if (btnNote !== null) {
    const champ = ligne.querySelector("input");
    const note = Number(champ.value);
    const valide = champ.value !== "" && note >= 0 && note <= 20;
    if (!valide) {
      ligne.querySelector(".message").hidden = false;
      return;
    }
    eleve.notes.push(note);
  }

  filtrer(); 
});



const form = document.getElementById("form-eleve");
const selectGroupe = document.getElementById("groupe");
const codeForce = document.getElementById("code-force");
const formSucces = document.getElementById("form-succes");
const formErreur = document.getElementById("form-erreur");

selectGroupe.append(...groupes.map(creerOption));

for (let champ of form.querySelectorAll(".champ")) {
  champ.classList.remove("valide", "erreur");
}

const messagesAide = {};
for (let message of form.querySelectorAll(".message")) {
  messagesAide[message.id] = message.textContent;
}

function forceDuCode(code) {
  let force = 0;
  if (code.length >= 8) force++;
  if (/[A-Z]/.test(code) && /\d/.test(code)) force++;
  if (/[^A-Za-z0-9]/.test(code)) force++;
  return force;
}

const regles = {
  prenom: {
    test: (v) => /^[A-Za-zÀ-ÿ\s-]{2,}$/.test(v.trim()),
    ok: "Prénom valide.",
    ko: "2 caractères minimum : lettres, espaces ou tirets."
  },
  nom: {
    test: (v) => /^[A-Za-zÀ-ÿ\s-]{2,}$/.test(v.trim()),
    ok: "Nom valide.",
    ko: "2 caractères minimum : lettres, espaces ou tirets."
  },
  groupe: {
    test: (v) => v !== "",
    ok: "Groupe choisi.",
    ko: "Choisissez un groupe."
  },
  email: {
    test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    ok: "Email valide.",
    ko: "Email invalide. Exemple : parent@mail.ma"
  },
  telephone: {
    test: (v) => /^(0[67]|\+212[67])\d{8}$/.test(v.replace(/\s/g, "")),
    ok: "Téléphone valide.",
    ko: "06 / 07 ou +212 6 / 7, puis 8 chiffres."
  },
  code: {
    test: (v) => forceDuCode(v) === 3,
    ok: "Code robuste.",
    ko: "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial."
  }
};

function validerChamp(nomChamp) {
  const element = form.elements[nomChamp];
  const champ = element.closest(".champ");
  const message = document.getElementById(`${nomChamp}-msg`);
  const regle = regles[nomChamp];
  const valide = regle.test(element.value);

  champ.classList.toggle("valide", valide);
  champ.classList.toggle("erreur", !valide);
  message.textContent = valide ? regle.ok : regle.ko;
  return valide;
}

function reinitialiserChamps() {
  for (let champ of form.querySelectorAll(".champ")) {
    champ.classList.remove("valide", "erreur");
  }
  for (let id in messagesAide) {
    document.getElementById(id).textContent = messagesAide[id];
  }
  codeForce.value = 0;
}

for (let nomChamp in regles) {
  const evenement = nomChamp === "groupe" ? "change" : "input";
  form.elements[nomChamp].addEventListener(evenement, () => {
    formSucces.hidden = true;
    formErreur.hidden = true;
    validerChamp(nomChamp);
  });
}

form.elements.code.addEventListener("input", () => {
  codeForce.value = forceDuCode(form.elements.code.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSucces.hidden = true;
  formErreur.hidden = true;

  let toutValide = true;
  for (let nomChamp in regles) {
    if (!validerChamp(nomChamp)) toutValide = false;
  }
  if (!toutValide) return;

  const groupeId = Number(form.elements.groupe.value);
  const tailleGroupe = eleves.filter((el) => el.groupeId === groupeId).length;
  if (tailleGroupe >= MAX_PAR_GROUPE) {
    formErreur.textContent = `Ce groupe est complet (${MAX_PAR_GROUPE} élèves).`;
    formErreur.hidden = false;
    return;
  }

  let idMax = 0;
  for (let eleve of eleves) {
    if (eleve.id > idMax) idMax = eleve.id;
  }

  eleves.push({
    id: idMax + 1,
    prenom: form.elements.prenom.value.trim(),
    nom: form.elements.nom.value.trim(),
    groupeId: groupeId,
    emailParent: form.elements.email.value.trim(),
    telephoneParent: form.elements.telephone.value.replace(/\s/g, ""),
    absences: 0,
    notes: []
  });

  form.reset();
  reinitialiserChamps();
  formSucces.hidden = false;
  filtrer();
});


filtrer();