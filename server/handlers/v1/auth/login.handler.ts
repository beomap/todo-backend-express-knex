import { Request, Response } from "express";
import { z } from "zod";
import { UserRepo } from "../../../repo/user.repo";
import { comparePassword, hashPassword, signJWT } from "../../../lib/hash";
import { JWT_SECRET } from "../../../lib/env";

const registerInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function loginHandler(req: Request, res: Response) {
  try {
    const data = registerInput.parse(req.body);
    const user = await UserRepo.getUserByEmail(data.email);

    if (!user) {
      return res.status(401).json({
        error: "invalid email or password",
      });
    }

    const isOk = await comparePassword(data.password, user?.password);
    if (!isOk) {
      return res.status(401).json({
        error: "invalid email or password",
      });
    }

    const access_token = signJWT(
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
    res.status(500).json({
      error: err.message,
    });
  }
}
