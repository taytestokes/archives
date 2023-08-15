import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { RegisterUserData } from "./user.schema";

/**
 * Handles registering new unique users into the platform
 */
export async function registerUser(data: RegisterUserData) {
  const hashedPassword = bcrypt.hashSync(data.password, 15);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
}
