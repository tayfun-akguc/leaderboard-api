export interface EnvironmentVariables {
  NODE_ENV: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_CONNECT_TIMEOUT: number;
  REDIS_USERNAME: string | undefined;
  REDIS_PASSWORD: string | undefined;
  MONGO_CONNECTION_URI: string;
  BETTERSTACK_SOURCE_TOKEN: string;
  JWT_SECRET: string;
}
