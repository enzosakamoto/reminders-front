/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REMINDER_API_URL: string
  readonly VITE_OBSERVATION_API_URL: string
  readonly VITE_CONSULT_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
