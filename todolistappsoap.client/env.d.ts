/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string;
    // ajoutez d'autres variables d'environnement ici si nécessaire
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
