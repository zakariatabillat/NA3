const liste = document.getElementById("liste-eleves");
const compteur = document.getElementById("compteur");
const aucunResultat = document.getElementById("aucun-resultat");
const recherche = document.getElementById("recherche");
const filtreGroupe = document.getElementById("filtre-groupe");
const tri = document.getElementById("tri");

// ---------- Outils ----------
function creer(balise, classes, texte) {
  const el = document.createElement(balise);
  el.classList.add(...classes.split(" "));
  if (texte !== undefined) el.textContent = texte;
  return el;
}

function calculerMoyenne(notes) {
  if (notes.length === 0) return null;
  let total = 0;
  for (let note of notes) {
    total += note;
  }
  return total / notes.length;
}

function formaterNombre(nombre) {
  return String(Math.round(nombre * 10) / 10).replace(".", ",");
}

function formaterMoyenne(moyenne) {
  if (moyenne === null) return "—";
  return `${formaterNombre(moyenne)} / 20`;
}

// ---------- Une ligne élève ----------
function creerLigne(eleve) {
  const alerte = eleve.absences >= 3;

  const li = creer("li", "rounded-2xl border border-line bg-card p-3");
  if (alerte) li.classList.add("alerte");
  li.dataset.id = eleve.id;

  const div = creer("div", "flex flex-col gap-3 lg:flex-row lg:items-center");

  const btnFiche = creer("button", "btn-fiche flex min-h-11 flex-1 items-center gap-3 text-left");
  btnFiche.type = "button";

  const couleur = alerte ? "bg-alert text-white" : "bg-brand-soft text-brand";
  const initiales = creer("span", `grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold ${couleur}`,
                          eleve.prenom[0] + eleve.nom[0]);

  const infos = creer("span", "min-w-0 flex-1");
  const nom = creer("span", "block truncate font-medium", `${eleve.prenom} ${eleve.nom}`);
  const absences = creer("span", "block text-sm text-muted",
                         `${eleve.absences} absence${eleve.absences > 1 ? "s" : ""}`);
  if (alerte) {
    const badge = creer("span", "badge ml-1 whitespace-nowrap rounded-full bg-alert px-2 py-0.5 text-xs font-medium text-white",
                        "Prévenir les parents");
    absences.append(" ", badge);
  }
  infos.append(nom, absences);

  const moyenne = creer("span", "font-serif text-xl", formaterMoyenne(calculerMoyenne(eleve.notes)));
  btnFiche.append(initiales, infos, moyenne);

  const actions = creer("div", "flex gap-2");

  const btnAbsent = creer("button", "btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper", "Absent");
  btnAbsent.type = "button";

  const inputNote = creer("input", "h-11 min-w-0 flex-1 rounded-full border border-line bg-paper px-4 text-sm lg:w-24 lg:flex-none");
  inputNote.type = "number";
  inputNote.min = 0;
  inputNote.max = 20;
  inputNote.step = 0.5;
  inputNote.placeholder = "Note";
  inputNote.setAttribute("aria-label", "Note sur 20");

  const btnNote = creer("button", "btn-note h-11 rounded-full bg-ink px-3 sm:px-4 text-sm font-medium text-white hover:bg-brand", "Ajouter la note");
  btnNote.type = "button";

  actions.append(btnAbsent, inputNote, btnNote);
  div.append(btnFiche, actions);

  const message = creer("p", "message mt-2 text-xs text-alert", "La note doit être un nombre entre 0 et 20.");
  message.hidden = true;

  li.append(div, message);
  return li;
}

// ---------- US5 : bilan du groupe ----------
const bilanMoyenne = document.getElementById("bilan-moyenne");
const bilanAbsences = document.getElementById("bilan-absences");
const bilanAlertes = document.getElementById("bilan-alertes");
const listeParents = document.getElementById("liste-parents");
const aucuneAlerte = document.getElementById("aucune-alerte");

function afficherBilan(groupe) {
  const avecNotes = groupe.filter((el) => el.notes.length > 0);
  const somme = avecNotes.reduce((total, el) => total + calculerMoyenne(el.notes), 0);
  bilanMoyenne.textContent = avecNotes.length === 0 ? "—" : formaterNombre(somme / avecNotes.length);

  bilanAbsences.textContent = groupe.reduce((total, el) => total + el.absences, 0);

  const enAlerte = groupe.filter((el) => el.absences >= 3);
  bilanAlertes.textContent = enAlerte.length;

  const lignes = enAlerte.map((el) =>
    creer("li", "rounded-xl bg-card px-3 py-2 ring-1 ring-line", `${el.prenom} – ${el.telephoneParent}`)
  );
  listeParents.replaceChildren(...lignes);

  aucuneAlerte.hidden = !groupe.every((el) => el.absences < 3);
}

// ---------- Affichage, filtre, recherche, tri ----------
function afficher(listeEleves) {
  liste.replaceChildren(...listeEleves.map(creerLigne));
  const n = listeEleves.length;
  compteur.textContent = `${n} élève${n > 1 ? "s" : ""}`;
  aucunResultat.hidden = n > 0;
}

function creerOption(groupe) {
  const option = document.createElement("option");
  option.textContent = groupe.nom;
  option.value = groupe.id;
  return option;
}
filtreGroupe.append(...groupes.map(creerOption));

function filtrer() {
  const texte = recherche.value.trim().toLowerCase();

  const groupe = eleves.filter((eleve) =>
    filtreGroupe.value === "" || eleve.groupeId === Number(filtreGroupe.value)
  );

  let resultat = groupe.filter((eleve) =>
    `${eleve.prenom} ${eleve.nom}`.toLowerCase().includes(texte)
  );

  if (tri.value === "nom") {
    resultat.sort((a, b) => a.nom.localeCompare(b.nom));
  }
  if (tri.value === "moyenne") {
    resultat.sort((a, b) => (calculerMoyenne(b.notes) ?? -1) - (calculerMoyenne(a.notes) ?? -1));
  }

  afficher(resultat);
  afficherBilan(groupe);
}

recherche.addEventListener("input", filtrer);
filtreGroupe.addEventListener("change", filtrer);
tri.addEventListener("change", filtrer);

// ---------- Fiche élève ----------
const fiche = document.getElementById("fiche");
const ficheNom = document.getElementById("fiche-nom");
const ficheGroupe = document.getElementById("fiche-groupe");
const ficheNotes = document.getElementById("fiche-notes");

function ouvrirFiche(eleve) {
  const groupe = groupes.find((g) => g.id === eleve.groupeId);
  ficheNom.textContent = `${eleve.prenom} ${eleve.nom}`;
  ficheGroupe.textContent = `${groupe.nom} — ${groupe.cours}`;

  if (eleve.notes.length === 0) {
    ficheNotes.replaceChildren(creer("li", "text-sm text-muted", "Aucune note pour le moment."));
  } else {
    ficheNotes.replaceChildren(...eleve.notes.map((note) =>
      creer("li", "rounded-full bg-paper px-3 py-1", formaterNombre(note))
    ));
  }
  fiche.showModal();
}

// ---------- Clics dans la liste ----------
liste.addEventListener("click", (e) => {
  const btnAbsent = e.target.closest(".btn-absent");
  const btnNote = e.target.closest(".btn-note");
  const btnFiche = e.target.closest(".btn-fiche");
  if (btnAbsent === null && btnNote === null && btnFiche === null) return;

  const ligne = e.target.closest("li");
  const eleve = eleves.find((el) => el.id === Number(ligne.dataset.id));

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

// ---------- US4 : formulaire d'ajout ----------
const form = document.getElementById("form-eleve");
const codeForce = document.getElementById("code-force");
const formSucces = document.getElementById("form-succes");
const formErreur = document.getElementById("form-erreur");

document.getElementById("groupe").append(...groupes.map(creerOption));

const regles = {
  prenom: {
    regex: /^[A-Za-zÀ-ÿ\s-]{2,}$/,
    aide: "2 caractères minimum : lettres, espaces ou tirets.",
    ok: "Prénom valide.",
    erreur: "Prénom invalide : 2 caractères minimum, lettres, espaces ou tirets."
  },
  nom: {
    regex: /^[A-Za-zÀ-ÿ\s-]{2,}$/,
    aide: "2 caractères minimum : lettres, espaces ou tirets.",
    ok: "Nom valide.",
    erreur: "Nom invalide : 2 caractères minimum, lettres, espaces ou tirets."
  },
  groupe: {
    regex: /^\d+$/,
    aide: "Groupe de l'élève.",
    ok: "Groupe choisi.",
    erreur: "Choisissez un groupe."
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
    aide: "Exemple : parent@mail.ma",
    ok: "Email valide.",
    erreur: "Email invalide. Exemple : parent@mail.ma"
  },
  telephone: {
    regex: /^(0[67]|\+212[67])\d{8}$/,
    aide: "06 / 07 ou +212 6 / 7, puis 8 chiffres.",
    ok: "Téléphone valide.",
    erreur: "Numéro invalide : 06 / 07 ou +212 6 / 7, puis 8 chiffres."
  },
  code: {
    regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
    aide: "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial.",
    ok: "Code valide.",
    erreur: "Code trop faible : 8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial."
  }
};

function validerChamp(nomChamp) {
  const input = form.elements[nomChamp];
  const valide = regles[nomChamp].regex.test(input.value.trim());
  const champ = input.closest(".champ");

  champ.classList.toggle("valide", valide);
  champ.classList.toggle("erreur", !valide);
  document.getElementById(`${nomChamp}-msg`).textContent = valide ? regles[nomChamp].ok : regles[nomChamp].erreur;
  return valide;
}

function viderFormulaire() {
  form.reset();
  for (let nomChamp in regles) {
    form.elements[nomChamp].closest(".champ").classList.remove("valide", "erreur");
    document.getElementById(`${nomChamp}-msg`).textContent = regles[nomChamp].aide;
  }
  codeForce.value = 0;
}

form.addEventListener("input", (e) => {
  const nomChamp = e.target.name;
  if (regles[nomChamp] === undefined) return;

  formSucces.hidden = true;
  formErreur.hidden = true;
  validerChamp(nomChamp);

  if (nomChamp === "code") {
    const code = e.target.value;
    let force = 0;
    if (code.length >= 8) force++;
    if (/[A-Z]/.test(code) && /\d/.test(code)) force++;
    if (/[^A-Za-z0-9]/.test(code)) force++;
    codeForce.value = force;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSucces.hidden = true;
  formErreur.hidden = true;

  const nomsChamps = Object.keys(regles);
  const resultats = nomsChamps.map(validerChamp);
  if (!resultats.every((v) => v)) {
    form.elements[nomsChamps[resultats.indexOf(false)]].focus();
    return;
  }

  const prenom = form.elements.prenom.value.trim();
  const nom = form.elements.nom.value.trim();
  const groupeId = Number(form.elements.groupe.value);

  const existe = eleves.some((el) =>
    el.groupeId === groupeId &&
    el.prenom.toLowerCase() === prenom.toLowerCase() &&
    el.nom.toLowerCase() === nom.toLowerCase()
  );
  if (existe) {
    formErreur.textContent = "Cet élève existe déjà dans ce groupe.";
    formErreur.hidden = false;
    form.elements.prenom.focus();
    return;
  }

  if (eleves.filter((el) => el.groupeId === groupeId).length >= 15) {
    formErreur.textContent = "Ce groupe est complet (15 élèves).";
    formErreur.hidden = false;
    form.elements.groupe.focus();
    return;
  }

  eleves.push({
    id: Math.max(...eleves.map((el) => el.id)) + 1,
    prenom: prenom,
    nom: nom,
    groupeId: groupeId,
    emailParent: form.elements.email.value.trim(),
    telephoneParent: form.elements.telephone.value.trim(),
    absences: 0,
    notes: []
  });

  viderFormulaire();
  formSucces.hidden = false;
  filtrer();
});

// ---------- Démarrage ----------
viderFormulaire();
filtrer();