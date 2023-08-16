import { optional, z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

/**
 * Defines the the data shape for creating a new record.
 */
const createRecordRequestSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  userId: z.string(),
});

/**
 * Types infered from the schema data shapes
 */
export type CreateRecordRequest = z.infer<typeof createRecordRequestSchema>;
