/**
 * Google Apps Script — append RSVP rows with one guest-count column per event.
 *
 * Setup: Extensions → Apps Script, paste this file, set SPREADSHEET_ID and SHEET_NAME,
 * deploy as Web app (Execute as: Me, Who has access: Anyone).
 * Site env: VITE_RSVP_ENDPOINT=<web app URL>
 */

const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1';

/** Must match event slugs in src/data/wedding.ts (order = sheet columns). */
const EVENT_SLUGS = ['welcome-party', 'haldi', 'wedding', 'reception'];
const EVENT_GUEST_HEADERS = [
  'Guests — Mehndi / Welcome',
  'Guests — Haldi',
  'Guests — Wedding',
  'Guests — Reception',
];

function sheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
}

function ensureHeaderRow() {
  const sh = sheet();
  if (sh.getLastRow() > 0) return;
  const eventHeaders = EVENT_GUEST_HEADERS;
  sh.appendRow(
    [
      'Submitted at',
      'Name',
      'Email',
      'Phone',
      'Party',
      'Attending',
      'Events (summary)',
    ].concat(eventHeaders).concat([
      'Diet',
      'Allergies',
      'Hotel',
      'Transport',
      'Song',
      'Notes',
      'Event attendance (JSON)',
    ])
  );
}

function guestCountsFromPayload(data) {
  const counts = {};
  EVENT_SLUGS.forEach(function (slug) {
    counts[slug] = 0;
  });

  if (data.guestCountBySlug && typeof data.guestCountBySlug === 'object') {
    EVENT_SLUGS.forEach(function (slug) {
      counts[slug] = Number(data.guestCountBySlug[slug]) || 0;
    });
    return counts;
  }

  if (Array.isArray(data.eventAttendance)) {
    data.eventAttendance.forEach(function (row) {
      if (row && row.slug && EVENT_SLUGS.indexOf(row.slug) !== -1) {
        counts[row.slug] = row.attending ? Number(row.guestCount) || 0 : 0;
      }
    });
    return counts;
  }

  if (data.eventGuests && typeof data.eventGuests === 'object' && Array.isArray(data.selectedEvents)) {
    EVENT_SLUGS.forEach(function (slug) {
      counts[slug] = data.selectedEvents.indexOf(slug) !== -1 ? Number(data.eventGuests[slug]) || 0 : 0;
    });
  }

  return counts;
}

function appendRow(data) {
  ensureHeaderRow();
  const counts = guestCountsFromPayload(data);
  const eventCols = EVENT_SLUGS.map(function (slug) {
    return counts[slug];
  });

  sheet().appendRow(
    [
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.party || '',
      data.attending || '',
      data.eventsSummary || data.events || '',
    ]
      .concat(eventCols)
      .concat([
        data.diet || '',
        data.allergies || '',
        data.hotel || '',
        data.transport || '',
        data.song || '',
        data.notes || '',
        JSON.stringify(data.eventAttendance || []),
      ])
  );
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(raw);
    appendRow(data);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}

function testAppend() {
  appendRow({
    name: 'Test Guest',
    email: 'test@example.com',
    phone: '+356 123',
    party: 'Partner',
    attending: 'yes',
    eventsSummary: 'Welcome Party / Mehndi (2), Haldi (1)',
    guestCountBySlug: {
      'welcome-party': 2,
      haldi: 1,
      wedding: 0,
      reception: 0,
    },
    eventAttendance: [
      { slug: 'welcome-party', event: 'Welcome Party / Mehndi', attending: true, guestCount: 2 },
      { slug: 'haldi', event: 'Haldi', attending: true, guestCount: 1 },
      { slug: 'wedding', event: 'Wedding', attending: false, guestCount: 0 },
      { slug: 'reception', event: 'Reception', attending: false, guestCount: 0 },
    ],
    diet: '',
    allergies: '',
    hotel: 'Radisson Blu',
    transport: 'yes',
    song: '',
    notes: 'Test',
  });
}
