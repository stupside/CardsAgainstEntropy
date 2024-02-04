import { FastifyInstance } from "fastify";

import map from "../features/card/map";
import deck from "../features/card/deck";
import draw from "../features/card/draw";
import resolve from "../features/card/resolve";

const route = async (fastify: FastifyInstance) => {
  fastify.get("", deck.Shorthand, deck.Route(fastify));
  // GET
  fastify.get("/:card", resolve.Shorthand, resolve.Route(fastify));
  // POST
  fastify.post("/map", map.Shorthand, map.Route(fastify));
  fastify.post("/draw", draw.Shorthand, draw.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/cards" });
};
