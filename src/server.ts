import config from "config";

import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fastifyJwt from "@fastify/jwt";

import { healthRoutes } from "./routes/v1/health";
import { userRoutes } from "./routes/v1/user";
import { recordRoutes } from "./routes/v1/record";

import { userSchemas } from "./schemas/user";
import { recordSchemas } from "./schemas/record";

function buildServer() {
  const schemas = [...userSchemas, ...recordSchemas];

  // Server Instance
  const server: FastifyInstance = Fastify();

  // Plugins
  server.register(fastifyJwt, {
    secret: config.get("secret"),
  });

  // Decorators
  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.send(error);
      }
    }
  );

  // Hooks
  server.addHook("preHandler", (request, _, next) => {
    request.jwt = server.jwt;
    return next();
  });

  // Routes
  server.register(healthRoutes, { prefix: "api/v1/health" });
  server.register(userRoutes, { prefix: "api/v1/users" });
  server.register(recordRoutes, { prefix: "api/v1/records" });

  // Schemas
  for (const schema of schemas) {
    server.addSchema(schema);
  }

  return server;
}

export default buildServer;
