/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly API_GEMINI: string;
    // más variables de entorno...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
