import { Express, Request, Response, NextFunction } from "express";
import { verifyJWT } from "../lib/hash";
import { JWT_SECRET } from "../lib/env";

// Your custom "middleware" function:
export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  if (!token) {
    res.status(401).json({
      error: "unauthorized",
    });
    return;
  }

  try {
    const user = await verifyJWT(token, JWT_SECRET);
    // @ts-ignore
    req.user = user;
    next();
  } catch (err: any) {
    res.status(401).json({
      error: "unauthorized",
    });
    return;
  }
}
