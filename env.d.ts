declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    DATABASE_URL: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_CALLBACK_URL: string;
  }
}