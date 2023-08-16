import "dotenv/config";
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

// Server Instance
export const server: FastifyInstance = Fastify();

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

// Routes
server.register(healthRoutes, { prefix: "api/v1/health" });
server.register(userRoutes, { prefix: "api/v1/users" });
server.register(recordRoutes, { prefix: "api/v1/records" });

// TODO: Rmove this soon
server.get("/", async (request, reply) => {
  reply.code(200).send({ message: "Hello world!" });
});

// Schemas
for (const schema of userSchemas) {
  server.addSchema(schema);
}

server.listen({ port: config.get("port"), host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server ready on port: ${config.get("port")}!`);
});
