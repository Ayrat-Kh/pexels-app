/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PEXELS_IMAGES_URL: string;
  readonly VITE_PEXELS_API_URL: string;
  readonly VITE_PEXELS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
