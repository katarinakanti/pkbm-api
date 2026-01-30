import jwt from "jsonwebtoken";
import { User } from "./types/model/table/User";
import { Admin } from "./types/model/table/Admin";

export function signJWT(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET_KEY ?? "sample-jwt");
}

export async function extractJWT(token: string) {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY ?? "sample-jwt",
      async (err: any, data: any) => {
        if (err) {
          reject(err.toString());
        }
        resolve(data);
      }
    );
  });
}

export async function getUserFromAuthHeader(
  authorization: string
): Promise<User> {
  const [_, token] = authorization.split(" ");
  if (!token) {
    throw new Error(`Data tidak ditemukan`);
  }

  const id = await extractJWT(token);
  if (!id && isNaN(parseInt(id))) {
    throw new Error(`Data tidak ditemukan.`);
  }

  const pengguna: User | null = await User.findOne({
    where: {
      id: parseInt(id),
    }
  });
  if (!pengguna) {
    throw new Error(`data tidak ditemukan.`);
  }
  return pengguna;
}

export async function getAdminFromAuthHeader(
  authorization: string
): Promise<Admin> {
  const [_, token] = authorization.split(" ");
  if (!token) {
    throw new Error(`Data tidak ditemukan`);
  }

  const id = await extractJWT(token);
  if (!id && isNaN(parseInt(id))) {
    throw new Error(`Data tidak ditemukan.`);
  }

  const admin: Admin | null = await Admin.findOne({
    where: {
      id: parseInt(id),
    }
  });
  if (!admin) {
    throw new Error(`data tidak ditemukan.`);
  }
  return admin;
}