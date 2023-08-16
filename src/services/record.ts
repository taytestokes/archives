import prisma from "../lib/prisma";
import { CreateRecordRequest } from "../schemas/record";

/**
 * Creates a new record for a user.
 */
export async function createRecord(data: CreateRecordRequest) {
  return prisma.record.create({
    data,
  });
}
