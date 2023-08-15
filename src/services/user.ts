import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { RegisterUserRequest } from "../schemas/user";

/**
 * Handles registering new unique users into the platform
 */
export async function registerUser(data: RegisterUserRequest) {
  const hashedPassword = bcrypt.hashSync(data.password, 15);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
}

/**
 * Handles finding an existing user in the platform by their email address
 */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
