import { FastifyInstance } from "fastify";
import {
  createRecordHandler,
  getRecordByUrlHandler,
} from "../../controllers/record";
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

  server.get(
    "/",
    {
      onRequest: [server.authenticate],
      schema: {
        response: {
          200: $ref("getRecordByUrlResponseSchema"),
        },
      },
    },
    getRecordByUrlHandler
  );
}
