import { test } from "tap";
import buildServer from "../server";

test("/health check", async (t) => {
  const fastify = buildServer();

  t.teardown(() => {
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: "/health",
  });

  t.equal(response.statusCode, 200);
  t.same(response.json(), { message: "Server is healthy!" });
});
