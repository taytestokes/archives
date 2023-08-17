import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const registerUserRequestSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

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

const loginUserRequestSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

const loginUserResponseSchema = z.object({
  accessToken: z.string(),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  registerUserRequestSchema,
  registerUserResponseSchema,
  loginUserRequestSchema,
  loginUserResponseSchema,
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
export type RegisterUserResponse = z.infer<typeof registerUserResponseSchema>;
export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;
export type LoginUserResponse = z.infer<typeof loginUserResponseSchema>;
