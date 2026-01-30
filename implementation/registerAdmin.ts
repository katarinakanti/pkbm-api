import { IsNull, Not } from "typeorm";
import bcrypt from 'bcrypt';
import { v4 } from "uuid";
import { signJWT } from "../jwt";
import { T_registerAdmin } from "../types/api/registerAdmin";
import { User } from "../types/model/table/User";
import { Admin } from "../types/model/table/Admin";

export const registerAdmin: T_registerAdmin = async req => {
  if (await Admin.existsBy({ email: req.body.email })) {
    throw new Error(`email sudah terdaftar`);
  }
  const admin = new Admin();

  admin.fullname = req.body.fullname;
  admin.email = req.body.email;
  admin.password = await bcrypt.hash(req.body.password, 10);

  admin.created_at = new Date();

  await admin.save();
  return {
    token: signJWT(admin.id),
    admin
  };
}
