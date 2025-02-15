import { Request, Response } from "express";
import { z } from "zod";
import { UserRepo } from "../../../repo/user.repo";
import { hashPassword, signJWT } from "../../../lib/hash";
import { JWT_SECRET } from "../../../lib/env";
import $prisma from "../../../lib/prisma";

const registerInput = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords dont's match",
    path: ["confirm_password"],
  });

export async function registerHandler(req: Request, res: Response) {
  try {
    const data = registerInput.parse(req.body);
    const user = await UserRepo.createUser($prisma, {
      email: data.email,
      pwd: await hashPassword(data.password),
    });

    const access_token = await signJWT(
      {
        email: user.email,
        id: user.id,
      },
      JWT_SECRET,
    );

    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        access_token,
      },
    });
  } catch (err: any) {
    res.status(500).json(err);
  }
}
