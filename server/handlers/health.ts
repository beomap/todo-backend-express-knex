import { Request, Response } from "express";

export const healthHandler = (req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
};
