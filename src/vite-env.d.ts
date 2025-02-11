/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PEXELS_BASE_URL: string;
  readonly VITE_PEXELS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
