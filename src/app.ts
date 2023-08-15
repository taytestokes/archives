import "dotenv/config";
import config from "config";
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import userRoutes from "./routes/user";
import { userSchemas } from "./schemas/user";

export const server: FastifyInstance = Fastify();

// Plugins
server.register(fastifyCors, {
  origin: [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:5555",
  ],
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
});

server.register(fastifyJwt, {
  secret: config.get("secret"),
});

// Decorators
server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {}
  }
);

// Endpoints
server.get("/health", async function () {
  return { status: "OK", code: 200 };
});

async function main() {
  // Schemas
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  // Routes
  server.register(userRoutes, { prefix: "api/users" });

  try {
    server.listen({ port: config.get("port") });
    console.log(`Server ready on port: ${config.get("port")}!`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
