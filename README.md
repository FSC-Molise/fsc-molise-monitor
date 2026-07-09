# FSC Molise 2021-2027 — Piattaforma di Monitoraggio

## Cloud già configurato

Il blocco `FSC_CONFIG` in cima a `index.html` è già compilato.
Ogni utente, da qualsiasi browser, si collega automaticamente al foglio Google
condiviso. Lettura e scrittura sono attive: modifiche, nuovi interventi ed
eliminazioni finiscono direttamente sul foglio.

Nessuno deve inserire credenziali.

## Cosa può cambiare l'Admin

Solo `scriptUrl`, e solo se viene ridistribuito l'Apps Script
(ogni nuova distribuzione genera un URL `/exec` diverso).

- Temporaneamente: tab **Gestione** → campo URL Apps Script (vale per la sessione)
- Definitivamente: modifica `scriptUrl` in `index.html` e ricarica su GitHub

## Apps Script

Il file `AppsScript_FSC.gs` contiene la versione aggiornata da incollare in
Estensioni → Apps Script. Supporta tre azioni: `update`, `append`, `delete`.
La versione precedente gestiva solo `update`: senza aggiornarla, i nuovi
interventi e le eliminazioni non verranno scritti sul foglio.

Dopo aver incollato il codice: Distribuisci → Nuova distribuzione → App web →
Esegui come **Me** → Chi ha accesso **Chiunque**.

## Sicurezza della API Key

La chiave è visibile nel sorgente della pagina. Va protetta lato Google:

1. console.cloud.google.com → Credenziali → clic sulla chiave
2. **Restrizioni applicazione** → Siti web → aggiungi `https://TUOUTENTE.github.io/*`
3. **Restrizioni API** → seleziona solo **Google Sheets API**

## Deploy su GitHub Pages

1. Carica `index.html`, `logo-molise.png` e la cartella `assets/` nel repository
2. Settings → Pages → Branch `main` → Folder `/ (root)` → Save
