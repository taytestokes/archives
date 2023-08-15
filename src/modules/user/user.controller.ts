import { FastifyRequest, FastifyReply } from "fastify";
import { registerUser } from "./user.service";

import { RegisterUserData } from "./user.schema";

/**
 * Handles request to register a new user into the platform
 */
export async function registerUserHandler(
  request: FastifyRequest<{
    Body: RegisterUserData;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await registerUser(request.body);
    reply.status(200).send(user);
  } catch (error) {
    reply.status(500).send({
      message: "Error registering a new user.",
      error,
    });
  }
}
