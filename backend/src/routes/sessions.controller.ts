import { FastifyInstance } from "fastify";

import join from "../features/session/join";
import create from "../features/session/create";

const route = async (fastify: FastifyInstance) => {
  fastify.post("/join", join.Shorthand, join.Route(fastify));
  fastify.post("/create", create.Shorthand, create.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/sessions" });
};
