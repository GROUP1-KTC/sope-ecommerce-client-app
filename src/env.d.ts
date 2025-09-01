/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL_V3: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
