import * as Joi from 'joi';

export const EnvironmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_USERNAME: Joi.string().optional(),
  REDIS_PASSWORD: Joi.string().optional(),
  REDIS_CONNECT_TIMEOUT: Joi.number().required(),
  MONGO_CONNECTION_URI: Joi.string().required(),
  BETTERSTACK_SOURCE_TOKEN: Joi.string().required(),
});

export const ValidationOptions = {
  abortEarly: true,
};
