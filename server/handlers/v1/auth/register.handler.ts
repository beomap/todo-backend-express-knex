import { Request, Response } from "express";
import { z } from "zod";
import { UserRepo } from "../../../repo/user.repo";
import { hashPassword } from "../../../lib/hash";

const registerInput = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password !== data.confirm_password, {
    message: "Passwords dont's match",
    path: ["confirm_password"],
  });

export async function register(req: Request, res: Response) {
  try {
    const data = registerInput.parse(req.body);
    const user = await UserRepo.createUser({
      email: data.email,
      pwd: await hashPassword(data.password),
    });

    // TODO: add jwt
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
}
