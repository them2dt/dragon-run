// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RPC_URL: string;
  readonly VITE_CM: string;
  readonly VITE_CM_COLLECTION: string;
  readonly VITE_FIREBASE_CONFIG: object;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'tw-elements' {}
