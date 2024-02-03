import { FastifyInstance } from "fastify";

import draw from "../features/card/draw";
import resolve from "../features/card/resolve";
import question from "../features/card/question";

const route = async (fastify: FastifyInstance) => {
  // GET
  fastify.get("/:card", resolve.Shorthand, resolve.Route(fastify));
  // POST
  fastify.post("/draw", draw.Shorthand, draw.Route(fastify));
  fastify.post("/question", question.Shorthand, question.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/cards" });
};
