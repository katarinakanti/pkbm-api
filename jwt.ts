import jwt from "jsonwebtoken";
import { User } from "./types/model/table/User";
import { Admin } from "./types/model/table/Admin";

const SECRET = process.env.JWT_SECRET ?? "sample-jwt";

export function signJWT(data: any) {
  return jwt.sign(data, SECRET);
}

export async function extractJWT(token: string) {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, SECRET, async (err: any, data: any) => {
      if (err) {
        reject(err.toString());
      }
      resolve(data);
    });
  });
}

export async function getUserFromAuthHeader(
  authorization: string,
): Promise<User> {
  const [_, token] = authorization.split(" ");
  if (!token) {
    throw new Error(`Data tidak ditemukan`);
  }

  const payload = await extractJWT(token);

  const userId = typeof payload === "object" ? payload.id : payload;

  if (!userId || isNaN(parseInt(userId))) {
    throw new Error(`Data tidak ditemukan.`);
  }

  const pengguna: User | null = await User.findOne({
    where: {
      id: parseInt(userId),
    },
  });
  if (!pengguna) {
    throw new Error(`data tidak ditemukan.`);
  }
  return pengguna;
}

export async function getAdminFromAuthHeader(
  authorization: string,
): Promise<Admin> {
  const [_, token] = authorization.split(" ");
  if (!token) {
    throw new Error(`Data tidak ditemukan`);
  }

  const payload = await extractJWT(token);
  const adminId = typeof payload === "object" ? payload.id : payload;

  if (!adminId || isNaN(parseInt(adminId))) {
    throw new Error(`Data tidak ditemukan.`);
  }

  const admin: Admin | null = await Admin.findOne({
    where: {
      id: parseInt(adminId),
    },
  });
  if (!admin) {
    throw new Error(`data tidak ditemukan.`);
  }
  return admin;
}
