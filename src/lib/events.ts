import { events, type WeddingEvent } from '../data/wedding';

// Malta is on CEST (UTC+2) for the whole wedding week.
const OFFSET = '+02:00';

export function eventEnd(e: WeddingEvent) {
  // Events that finish after midnight end on the following day.
  const start = new Date(`${e.date}T${e.startTime}:00${OFFSET}`);
  const end = new Date(`${e.date}T${e.finishTime}:00${OFFSET}`);
  if (end <= start) end.setDate(end.getDate() + 1);
  return end;
}

/** The next event that has not finished yet, or undefined once the week is over. */
export function nextEvent(now = new Date()) {
  return events.find((e) => eventEnd(e) > now);
}
