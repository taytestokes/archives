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

const getRecordByUrlRequestSchema = z.object({
  url: z.string(),
});

const getRecordByUrlResponseSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const { schemas: recordSchemas, $ref } = buildJsonSchemas(
  {
    createRecordRequestSchema,
    createRecordResponseSchema,
    getRecordByUrlRequestSchema,
    getRecordByUrlResponseSchema,
  },
  {
    $id: "RecordSchemas",
  }
);

export type CreateRecordRequest = z.infer<typeof createRecordRequestSchema>;
export type CreateRecoredResponse = z.infer<typeof createRecordResponseSchema>;
export type GetRecordByUrlRequest = z.infer<typeof getRecordByUrlRequestSchema>;
export type GetRecordByUrlResponse = z.infer<
  typeof getRecordByUrlResponseSchema
>;
