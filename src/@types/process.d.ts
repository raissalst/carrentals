export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
    }
  }
}
