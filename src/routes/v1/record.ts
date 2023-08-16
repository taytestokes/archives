import { FastifyInstance } from "fastify";
import { createRecordHandler } from "../../controllers/record";

export async function recordRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      onRequest: [server.authenticate],
    },
    createRecordHandler
  );
}
