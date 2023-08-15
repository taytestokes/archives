import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

/**
 * Defines the the data shape for the request body
 * received when registering a new user.
 */
const registerUserDataSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

/**
 * Defines the data shape for the response
 * when registering a new user.
 */
const registerUserResponseSchema = z.object({
  id: z.string(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  registerUserDataSchema,
  registerUserResponseSchema,
});

/**
 * Types infered from the schema data shapes
 */
export type RegisterUserData = z.infer<typeof registerUserDataSchema>;
export type RegisterUserResponse = z.infer<typeof registerUserResponseSchema>;
