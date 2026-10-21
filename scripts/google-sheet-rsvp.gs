/**
 * RSVP → Google Sheet
 *
 * 1. Create a blank Google Sheet.
 * 2. Extensions → Apps Script. Delete the sample code and paste this file.
 * 3. Deploy → New deployment → Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 4. Copy the web app URL (ends in /exec) into RSVP_SHEET_URL in src/lib/rsvpSheet.ts.
 *
 * The script writes the header row itself when the sheet is empty.
 * Each RSVP is one row. Guest counts are numbers. There is no JSON column.
 */

const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'Submitted at',
  'Name',
  'Email',
  'Phone',
  'Party',
  'Attending',
  'Events',
  'Guests — Mehndi / Welcome',
  'Guests — Haldi',
  'Guests — Wedding',
  'Guests — Reception',
  'Diet',
  'Allergies',
  'Hotel',
  'Transport',
  'Song',
  'Notes',
];

function sheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function ensureHeaders() {
  const sh = sheet();
  if (!sh) throw new Error('Missing sheet named ' + SHEET_NAME);
  if (sh.getLastRow() > 0) return;
  sh.appendRow(HEADERS);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
}

function num(value) {
  const n = Number(value);
  if (!isFinite(n) || n < 0) return 0;
  return Math.min(99, Math.floor(n));
}

function appendRow(data) {
  ensureHeaders();
  sheet().appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.party || '',
    data.attending || '',
    data.events || '',
    num(data.guestsWelcome),
    num(data.guestsHaldi),
    num(data.guestsWedding),
    num(data.guestsReception),
    data.diet || '',
    data.allergies || '',
    data.hotel || '',
    data.transport || '',
    data.song || '',
    data.notes || '',
  ]);
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    appendRow(JSON.parse(raw));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}
