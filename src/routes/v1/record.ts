import { FastifyInstance } from "fastify";
import { createRecordHandler } from "../../controllers/record";
import { $ref } from "../../schemas/record";

export async function recordRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      onRequest: [server.authenticate],
      schema: {
        body: $ref("createRecordRequestSchema"),
        response: {
          200: $ref("createRecordResponseSchema"),
        },
      },
    },
    createRecordHandler
  );
}
