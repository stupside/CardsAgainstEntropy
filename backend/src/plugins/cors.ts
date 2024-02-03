import fp from "fastify-plugin";

import cors from "@fastify/cors";

/**
 * This plugins adds some utilities to enable cors policies
 *
 * @see https://github.com/fastify/fastify-cors
 */
const plugin = fp(async (fastify, _) => {
  await fastify.register(cors, {
    hook: "preHandler",
    origin: '*',
  });
});

export default plugin;
