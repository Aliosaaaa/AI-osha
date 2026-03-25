// ─────────────────────────────────────────────────────────────
// AI OSHA — Workshop 12 Aprile
// Google Apps Script → Google Sheets
//
// ISTRUZIONI DI INSTALLAZIONE:
// 1. Apri il tuo Google Sheet:
//    https://docs.google.com/spreadsheets/d/1PuqKXzU0J_zgH7q6WGVBdVsI1BWuR3g_kUWBwoWFY20/edit
// 2. Vai su Estensioni → Apps Script
// 3. Cancella tutto il codice esistente e incolla questo file
// 4. Clicca "Salva" (icona dischetto)
// 5. Clicca "Distribuisci" → "Nuova distribuzione"
// 6. Tipo: "App web"
//    - Descrizione: Workshop 12 Aprile
//    - Esegui come: Me (il tuo account Google)
//    - Chi può accedere: Chiunque
// 7. Clicca "Distribuisci" e copia l'URL generato
// 8. Incolla quell'URL nel file ai-osha-live-12-aprile.html
//    dove trovi: const APPS_SCRIPT_URL = 'INCOLLA_QUI_IL_TUO_URL';
// ─────────────────────────────────────────────────────────────

const SHEET_ID = '1PuqKXzU0J_zgH7q6WGVBdVsI1BWuR3g_kUWBwoWFY20';
const SHEET_NAME = 'ISCRITTI CALDI'; // Nome del foglio (tab). Crealo se non esiste.

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Crea il foglio "ISCRITTI CALDI" con intestazioni se non esiste
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Data e Ora',
        'Nome Agenzia',
        'Nome Iscritto',
        'Email',
        'Telefono',
        'N. Dipendenti',
        'Sito Web',
        'Sorgente'
      ]]);
      // Formatta intestazioni
      const header = sheet.getRange(1, 1, 1, 8);
      header.setFontWeight('bold');
      header.setBackground('#003876');
      header.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Timestamp italiano
    const now = new Date();
    const timestamp = Utilities.formatDate(now, 'Europe/Rome', 'dd/MM/yyyy HH:mm:ss');

    // Aggiunge la riga con i dati
    sheet.appendRow([
      timestamp,
      data.nomeAgenzia  || '',
      data.nomeIscritto || '',
      data.email        || '',
      data.telefono     || '',
      data.dipendenti   || '',
      data.sitoWeb      || '',
      data.utm_source   || 'diretto'
    ]);

    // Notifica email (opzionale — commenta le 3 righe se non la vuoi)
    const emailDestinatario = Session.getActiveUser().getEmail();
    const oggetto = '🔔 Nuova iscrizione workshop — ' + (data.nomeAgenzia || 'N/D');
    const corpo = `Nuova iscrizione ricevuta il ${timestamp}:\n\n`
      + `Agenzia: ${data.nomeAgenzia}\n`
      + `Nome: ${data.nomeIscritto}\n`
      + `Email: ${data.email}\n`
      + `Telefono: ${data.telefono}\n`
      + `Dipendenti: ${data.dipendenti}\n`
      + `Sito: ${data.sitoWeb || '—'}\n`
      + `Sorgente: ${data.utm_source || 'diretto'}\n\n`
      + `Vedi il foglio: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;
    MailApp.sendEmail(emailDestinatario, oggetto, corpo);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Funzione di test — eseguila manualmente dallo script per verificare
function testDoPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        nomeAgenzia:  'Immobiliare Test',
        nomeIscritto: 'Mario Rossi',
        email:        'mario@test.it',
        telefono:     '+39 333 1234567',
        dipendenti:   '2-3',
        sitoWeb:      'https://www.test.it',
        utm_source:   'instagram'
      })
    }
  };
  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
