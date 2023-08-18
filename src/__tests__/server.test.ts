import { test } from "tap";
import { faker } from "@faker-js/faker";
import prisma from "../lib/prisma";
import buildServer from "../server";
import { UserType } from "@fastify/jwt";

test("/api/v1/health", async (t) => {
  const server = buildServer();

  t.teardown(() => {
    server.close();
  });

  const response = await server.inject({
    method: "GET",
    url: "/api/v1/health",
  });

  t.equal(response.statusCode, 200);
  t.same(response.json(), { message: "Server is healthy!" });
});

test("/api/v1/users/register", async () => {
  test("Sucessfully register a new user", async (t) => {
    const email = faker.internet.email();
    const password = faker.internet.email();

    const server = buildServer();

    t.teardown(async () => {
      server.close();
      await prisma.user.deleteMany({});
    });

    const response = await server.inject({
      method: "POST",
      url: "/api/v1/users/register",
      payload: {
        email,
        password,
      },
    });

    t.equal(response.statusCode, 200);
    t.type(response.json().id, "string");
    t.equal(response.json().email, email);
  });

  test("Fails to register a new user", async (t) => {
    const email = faker.internet.email();

    const server = buildServer();

    t.teardown(async () => {
      server.close();
      await prisma.user.deleteMany({});
    });

    const response = await server.inject({
      method: "POST",
      url: "/api/v1/users/register",
      payload: {
        email,
      },
    });

    t.equal(response.statusCode, 400);
    t.equal(
      response.json().message,
      "body must have required property 'password'"
    );
  });
});

test("/api/v1/users/login", async () => {
  test("Successfully login a user and create access token", async (t) => {
    const email = faker.internet.email();
    const password = faker.internet.email();

    const server = buildServer();

    t.teardown(async () => {
      server.close();
      await prisma.user.deleteMany({});
    });

    await server.inject({
      method: "POST",
      url: "/api/v1/users/register",
      payload: {
        email,
        password,
      },
    });

    const response = await server.inject({
      method: "POST",
      url: "/api/v1/users/login",
      payload: {
        email,
        password,
      },
    });

    t.equal(response.statusCode, 200);

    const verified = server.jwt.verify<UserType & { iat: number }>(
      response.json().accessToken
    );

    t.equal(verified.email, email);
    t.type(verified.id, "string");
    t.type(verified.iat, "number");
  });

  test("Failure to login a user and create access token", async (t) => {
    const email = faker.internet.email();
    const password = faker.internet.email();

    const server = buildServer();

    t.teardown(async () => {
      server.close();
      await prisma.user.deleteMany({});
    });

    await server.inject({
      method: "POST",
      url: "/api/v1/users/register",
      payload: {
        email,
        password,
      },
    });

    const response = await server.inject({
      method: "POST",
      url: "/api/v1/users/login",
      payload: {
        email,
        password: "Incorrect Password",
      },
    });

    t.equal(response.statusCode, 500);
    t.equal(response.json().message, "Error authenticating user.");
  });
});

test("api/v1/records", async () => {
  test("Successfully create a record for a user", async (t) => {
    const email = faker.internet.email();
    const password = faker.internet.email();

    const server = buildServer();

    t.teardown(async () => {
      server.close();
      await prisma.user.deleteMany({});
    });

    await server.inject({
      method: "POST",
      url: "/api/v1/users/register",
      payload: {
        email,
        password,
      },
    });

    const response = await server.inject({
      method: "POST",
      url: "/api/v1/users/login",
      payload: {
        email,
        password,
      },
    });

    console.log(response);
  });
});
