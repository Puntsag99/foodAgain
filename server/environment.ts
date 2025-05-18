declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_PASS: string;
    EMAIL_USER: string;
    JWT_SECRET: string;
    DB_CONNECTION_STRING: string;
  }
}
