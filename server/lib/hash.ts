import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export async function hashPassword(pwd: string) {
  const h = await bcrypt.hash(pwd, saltRounds);
  return h;
}

export async function comparePassword(pwd: string, hashedPwd: string) {
  return bcrypt.compare(pwd, hashedPwd);
}

export async function signJWT(payload: any, secret: string) {
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
}

export async function verifyJWT(token: string, secret: string) {
  const isOk = await jwt.verify(token, secret);
  if (isOk) {
    return decodeJWT(token);
  }

  throw Error("invalid token");
}

export async function decodeJWT(token: string) {
  return jwt.decode(token);
}
