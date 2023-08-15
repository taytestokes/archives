import { FastifyInstance } from "fastify";
import { registerUserHandler, loginUserHandler } from "../controllers/user";
import { $ref } from "../schemas/user";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("registerUserRequestSchema"),
        response: {
          200: $ref("registerUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginUserRequestSchema"),
        response: {
          200: $ref("loginUserResponseSchema"),
        },
      },
    },
    loginUserHandler
  );
}

export default userRoutes;
