// data.js — Données de départ (fictives) pour Nour Academy
// Chargé AVANT script.js : les variables `groupes` et `eleves` sont donc globales.

const groupes = [
  { id: 1, nom: "Groupe A", cours: "Mathématiques" },
  { id: 2, nom: "Groupe B", cours: "Français" },
  { id: 3, nom: "Groupe C", cours: "Sciences" }
];

// notes : sur 20
const eleves = [
  // --- Groupe A (Mathématiques) ---
  { id: 1,  prenom: "Yassine", nom: "El Amrani", groupeId: 1, telephoneParent: "0612345678", absences: 2,  notes: [14, 16, 12.5, 15] },
  { id: 2,  prenom: "Salma",   nom: "Benali",    groupeId: 1, telephoneParent: "0623456789", absences: 0,  notes: [18, 17.5, 19, 16] },
  { id: 3,  prenom: "Omar",    nom: "Tazi",      groupeId: 1, telephoneParent: "0634567890", absences: 7,  notes: [8, 9.5, 7, 10] },
  { id: 4,  prenom: "Imane",   nom: "Alaoui",    groupeId: 1, telephoneParent: "0645678901", absences: 1,  notes: [13, 11, 14.5] },
  { id: 5,  prenom: "Hamza",   nom: "Bennani",   groupeId: 1, telephoneParent: "0656789012", absences: 4,  notes: [10, 12, 9, 11.5] },
  { id: 6,  prenom: "Nour",    nom: "Chraibi",   groupeId: 1, telephoneParent: "0667890123", absences: 0,  notes: [] },

  // --- Groupe B (Français) ---
  { id: 7,  prenom: "Adam",    nom: "Idrissi",   groupeId: 2, telephoneParent: "0678901234", absences: 3,  notes: [15, 13.5, 14] },
  { id: 8,  prenom: "Aya",     nom: "Lahlou",    groupeId: 2, telephoneParent: "0689012345", absences: 0,  notes: [19, 18, 20, 17] },
  { id: 9,  prenom: "Mehdi",   nom: "Berrada",   groupeId: 2, telephoneParent: "0690123456", absences: 10, notes: [6, 8, 5.5, 7] },
  { id: 10, prenom: "Khadija", nom: "Fassi",     groupeId: 2, telephoneParent: "0701234567", absences: 2,  notes: [12, 13, 11.5, 14] },
  { id: 11, prenom: "Rayan",   nom: "Ziani",     groupeId: 2, telephoneParent: "0712345678", absences: 5,  notes: [9, 10.5, 11] },
  { id: 12, prenom: "Lina",    nom: "Mansouri",  groupeId: 2, telephoneParent: "0723456789", absences: 1,  notes: [16, 15.5, 17] },

  // --- Groupe C (Sciences) ---
  { id: 13, prenom: "Ilyas",   nom: "Kettani",   groupeId: 3, telephoneParent: "0734567890", absences: 0,  notes: [17, 16, 18.5, 15] },
  { id: 14, prenom: "Zineb",   nom: "Ouazzani",  groupeId: 3, telephoneParent: "0745678901", absences: 6,  notes: [10, 9, 12, 8.5] },
  { id: 15, prenom: "Anas",    nom: "Sebti",     groupeId: 3, telephoneParent: "0756789012", absences: 3,  notes: [13.5, 14, 12] },
  { id: 16, prenom: "Hiba",    nom: "Naciri",    groupeId: 3, telephoneParent: "0767890123", absences: 2,  notes: [11, 15, 13, 14.5] },
  { id: 17, prenom: "Youssef", nom: "Amrani",    groupeId: 3, telephoneParent: "0778901234", absences: 8,  notes: [7, 6.5, 9] },
  { id: 18, prenom: "Sara",    nom: "Bouzidi",   groupeId: 3, telephoneParent: "0789012345", absences: 0,  notes: [20, 19, 18] }
];