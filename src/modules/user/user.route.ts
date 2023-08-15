import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("registerUserDataSchema"),
        response: {
          200: $ref("registerUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );
}

export default userRoutes;
