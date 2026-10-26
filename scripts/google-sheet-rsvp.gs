/**
 * RSVP → Google Sheet
 *
 * One row per email. Editing an RSVP updates that row (no duplicate rows).
 *
 * Deploy: Extensions → Apps Script, paste, Deploy → Web app (Execute as: Me, Anyone).
 * If your sheet still has a "Hotel" column from an older version, delete that column
 * from row 1 and shift the columns to match HEADERS below.
 */

const SHEET_NAME = 'Sheet1';
const EMAIL_COL = 3;

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

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function num(value) {
  const n = Number(value);
  if (!isFinite(n) || n < 0) return 0;
  return Math.min(99, Math.floor(n));
}

function rowFromPayload(data, submittedAt) {
  return [
    submittedAt,
    data.name || '',
    String(data.email || '').trim(),
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
    data.transport || '',
    data.song || '',
    data.notes || '',
  ];
}

function findRowByEmail(email) {
  const sh = sheet();
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return 0;

  const key = normalizeEmail(email);
  if (!key) return 0;

  const emails = sh.getRange(2, EMAIL_COL, lastRow, EMAIL_COL).getValues();
  for (var i = 0; i < emails.length; i++) {
    if (normalizeEmail(emails[i][0]) === key) return i + 2;
  }
  return 0;
}

function upsertRow(data) {
  ensureHeaders();
  const sh = sheet();
  const email = String(data.email || '').trim();
  if (!email) throw new Error('Email is required');

  const existingRow = findRowByEmail(email);
  const now = new Date();

  if (existingRow > 0) {
    const submittedAt = sh.getRange(existingRow, 1).getValue() || now;
    const values = rowFromPayload(data, submittedAt);
    sh.getRange(existingRow, 1, existingRow, values.length).setValues([values]);
    return { updated: true, row: existingRow };
  }

  const values = rowFromPayload(data, now);
  sh.appendRow(values);
  return { updated: false, row: sh.getLastRow() };
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const result = upsertRow(JSON.parse(raw));
    return ContentService.createTextOutput(JSON.stringify({ ok: true, updated: result.updated })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}
