import { FastifyInstance } from "fastify";

import round from "../features/round/next";
import resolve from "../features/round/resolve";

const route = async (fastify: FastifyInstance) => {
  // GET
  fastify.get("/", resolve.Shorthand, resolve.Route(fastify));
  // POST
  fastify.post("/next", round.Shorthand, round.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/rounds" });
};
