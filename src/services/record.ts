import prisma from "../lib/prisma";
import { CreateRecordRequest } from "../schemas/record";

/**
 * Creates a new record for a user.
 */
export async function createRecord(
  data: CreateRecordRequest & { userId: string }
) {
  return prisma.record.create({
    data: {
      url: data.url,
      userId: data.userId,
      title: data.title,
      description: data.description,
    },
  });
}

export async function getRecordByUrl(url: string, userId: string) {
  return prisma.record.findUnique({
    where: {
      url,
      userId,
    },
  });
}
