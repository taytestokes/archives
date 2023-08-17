import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { server } from "../app";
import { findUserByEmail, registerUser } from "../services/user";
import { RegisterUserRequest, LoginUserRequest } from "../schemas/user";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: RegisterUserRequest;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await registerUser(request.body);
    return reply.status(200).send(user);
  } catch (error) {
    return reply.status(500).send({
      message: "Error registering a new user.",
      error,
    });
  }
}

export async function loginUserHandler(
  request: FastifyRequest<{
    Body: LoginUserRequest;
  }>,
  reply: FastifyReply
) {
  try {
    const user = await findUserByEmail(request.body.email);

    if (!user) {
      throw new Error(
        `User with the email of ${request.body.email} does not exist.`
      );
    }

    if (!bcrypt.compareSync(request.body.password, user.password)) {
      throw new Error(`Invalid password.`);
    }

    return reply.status(200).send({
      accessToken: server.jwt.sign({
        id: user.id,
        email: user.email,
      }),
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Error authenticating user.",
      error,
    });
  }
}
