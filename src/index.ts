import "dotenv/config";

import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fastifyJwt, { JWT } from "@fastify/jwt";

import { healthRoutes } from "./routes/v1/health";
import { userRoutes } from "./routes/v1/user";
import { recordRoutes } from "./routes/v1/record";

import { userSchemas } from "./schemas/user";
import { recordSchemas } from "./schemas/record";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: string;
      email: string;
    };
  }
}

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}

// Server Instance
const server: FastifyInstance = Fastify();

// Plugins
server.register(fastifyJwt, {
  secret: process.env.SECRET || "",
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
server.addHook("preHandler", (request, reply, next) => {
  request.jwt = server.jwt;
  return next();
});

// Routes
server.register(healthRoutes, { prefix: "api/v1/health" });
server.register(userRoutes, { prefix: "api/v1/users" });
server.register(recordRoutes, { prefix: "api/v1/records" });

// Schemas
const schemas = [...userSchemas, ...recordSchemas];

for (const schema of schemas) {
  server.addSchema(schema);
}

server.listen({ port: Number(process.env.PORT), host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server ready on port: ${process.env.PORT}!`);
});
