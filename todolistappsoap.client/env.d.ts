/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string;
    // ajoutez d'autres variables d'environnement ici si n�cessaire
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
