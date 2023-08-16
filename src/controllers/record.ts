import { FastifyReply, FastifyRequest } from "fastify";
import { createRecord } from "../services/record";
import { CreateRecordRequest } from "src/schemas/record";

/**
 * Handles creating a new archive record from the request
 * data for a user.
 */
export async function createRecordHandler(
  request: FastifyRequest<{
    Body: CreateRecordRequest;
  }>,
  reply: FastifyReply
) {
  try {
    const record = await createRecord({
      url: request.body.url,
      userId: request.user.id,
      title: request.body.title,
      description: request.body.description,
    });

    return reply.status(200).send(record);
  } catch (error) {
    return reply.status(500).send({
      message: "Error creating record.",
      error,
    });
  }
}
