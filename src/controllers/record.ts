import { FastifyReply, FastifyRequest } from "fastify";
import { createRecord, getRecordByUrl } from "../services/record";
import { CreateRecordRequest, GetRecordByUrlRequest } from "src/schemas/record";

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
    const { url, title, description } = request.body;

    const record = await createRecord({
      url,
      title,
      description,
      userId: request.user.id,
    });

    return reply.status(200).send(record);
  } catch (error) {
    return reply.status(500).send({
      message: "Error creating record.",
      error,
    });
  }
}

export async function getRecordByUrlHandler(
  request: FastifyRequest<{
    Querystring: GetRecordByUrlRequest;
  }>,
  reply: FastifyReply
) {
  try {
    const { url } = request.query;
    const { id } = request.user;

    const record = await getRecordByUrl(url, id);

    return reply.status(200).send(record);
  } catch (error) {
    return reply.status(500).send({ message: "Error fetching record." });
  }
}
