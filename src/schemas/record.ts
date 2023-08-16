import { optional, z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

/**
 * Defines the the data shape for creating a new record.
 */
const createRecordRequestSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

/**
 * Types infered from the schema data shapes
 */
export type CreateRecordRequest = z.infer<typeof createRecordRequestSchema>;
