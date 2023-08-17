import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createRecordRequestSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

const createRecordResponseSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const { schemas: recordSchema, $ref } = buildJsonSchemas({
  createRecordRequestSchema,
  createRecordResponseSchema,
});

export type CreateRecordRequest = z.infer<typeof createRecordRequestSchema>;
export type CreateRecoredResponse = z.infer<typeof createRecordResponseSchema>;
