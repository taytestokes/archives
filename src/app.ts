import Fastify from "fastify";

import userRoutes from "./modules/user/user.route";

import { userSchemas } from "./modules/user/user.schema";

const server = Fastify();

// Plugins

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
    server.listen(3000, "0.0.0.0");
    console.log("Server ready!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
