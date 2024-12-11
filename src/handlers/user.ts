import prisma from "../db";
import { Request, Response } from "express";
import { comparePassword, createJWT, hashpassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];
  const user = await prisma.user.create({
    data: {
      username,
      password: await hashpassword(password),
    },
  });

  const token = createJWT(user);

  res.json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    res.status(401).json({ message: "Invalid Username or Password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
