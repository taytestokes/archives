import { FastifyReply, FastifyRequest } from "fastify";
import {
  createRecord,
  getRecordByUrl,
  getUserRecords,
} from "../services/record";
import { CreateRecordRequest, GetRecordByUrlRequest } from "src/schemas/record";

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

export async function getUserRecordsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.user;

    const records = await getUserRecords(id);

    reply.status(200).send(records);
  } catch (error) {
    return reply.status(500).send({ message: "Error fetching user records." });
  }
}
