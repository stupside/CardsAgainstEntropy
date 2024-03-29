import fp from "fastify-plugin";
import redis from "@fastify/redis";

/**
 * This plugins adds redis support
 *
 * @see https://github.com/fastify/fastify-redis
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(redis, {
    namespace: "econsumer",
    url: fastify.config.GAME_REDIS_URL,
  });

  await fastify.register(redis, {
    namespace: "eproducer",
    url: fastify.config.GAME_REDIS_URL,
  });

  await fastify.register(redis, {
    namespace: "invitations",
    url: fastify.config.GAME_REDIS_URL,
  });
});

export default plugin;
