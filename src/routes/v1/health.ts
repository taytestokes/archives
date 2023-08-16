import { FastifyInstance } from "fastify";

import { healthCheckHandler } from "../../controllers/health";

export async function healthRoutes(server: FastifyInstance) {
  server.get("/", {}, healthCheckHandler);
}
