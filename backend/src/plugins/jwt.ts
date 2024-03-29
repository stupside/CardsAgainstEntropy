import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

/**
 * This plugins adds jwt support
 *
 * @see https://github.com/fastify/fastify-jwt
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(jwt, {
    secret: Buffer.from(fastify.config.GAME_JWT_SECRET, "hex"),
    sign: {
      iss: "game",
      aud: "game.aud",
      expiresIn: fastify.config.GAME_JWT_EXPIRY,
    },
  });
});

export default plugin;
