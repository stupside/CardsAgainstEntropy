import { FastifyInstance } from "fastify";

import draw from "../features/deck/draw";
import question from "../features/deck/question";

const route = async (fastify: FastifyInstance) => {
  fastify.post("/draw", draw.Shorthand, draw.Route(fastify));
  fastify.post("/question", question.Shorthand, question.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/decks" });
};
