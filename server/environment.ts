declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_PASS: string;
    EMAIL_USER: string;
    JWT_SECRET: string;
    FRONTEND_ENDPOINT: string;
    CLOUDINARY_API_KEY: string;
    DB_CONNECTION_STRING: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_SECRET: string;
  }
}
