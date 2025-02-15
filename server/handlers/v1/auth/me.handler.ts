import { Request, Response } from "express";
import { UserRepo } from "../../../repo/user.repo";

export async function getMeHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const user = await UserRepo.getUserById(req.user?.id);
    if (!user) {
      res.status(401).json({
        error: "user not found",
      });
      return;
    }

    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err: any) {
    res.status(500).json(err);
  }
}
