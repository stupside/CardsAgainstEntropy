import fp from "fastify-plugin";

import env, { FastifyEnvOptions } from "@fastify/env";

import { Type, Static } from "@sinclair/typebox";

const Schema = Type.Object({
  PORT: Type.Number(),
  GAME_DATABASE_URL: Type.String(),
  GAME_JWT_SECRET: Type.String(),
  GAME_REDIS_URL: Type.String(),
  GAME_BACKEND_URL: Type.String(),
  GAME_FRONTEND_CSR_URL: Type.String(),
  GAME_JWT_EXPIRY: Type.String(),
  GAME_MAX_CARDS: Type.Number(),
  GAME_MAX_PLAYERS: Type.Number(),
  GAME_CARDS_PATH: Type.String(),
});

declare module "fastify" {
  interface FastifyInstance {
    config: Static<typeof Schema>;
  }
}

/**
 * This plugins to work with .env.X
 *
 * @see https://github.com/fastify/fastify-env
 */
const plugin = fp(async (fastify, _) => {
  const options: FastifyEnvOptions = {
    dotenv: true,
    schema: Schema,
    data: process.env,
  };

  await fastify.register(env, options);
});

export default plugin;
