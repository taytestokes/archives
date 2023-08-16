import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Handles request to check health status of the server.
 */
export async function healthCheckHandler(
  _: FastifyRequest,
  reply: FastifyReply
) {
  return reply.status(200).send({
    message: "Server is healthy!",
  });
}
