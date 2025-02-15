import bcrypt, { compare } from "bcrypt";

const saltRounds = 10;

export async function hashPassword(pwd: string) {
  const h = await bcrypt.hash(pwd, saltRounds);
  return h;
}

export async function comparePassword(pwd: string, hashedPwd: string) {
  return bcrypt.compare(pwd, hashedPwd);
}
