/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional URL that receives RSVP replies as a JSON POST (e.g. a Formspree endpoint). */
  readonly VITE_RSVP_ENDPOINT?: string;
}
