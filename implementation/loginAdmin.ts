import { signJWT } from "../jwt";
import bcrypt from "bcrypt";
import { T_loginAdmin } from "../types/api/loginAdmin";
import { User } from "../types/model/table/User";
import { Admin } from "../types/model/table/Admin";

export const loginAdmin: T_loginAdmin = async (req) => {
  const admin = await Admin.findOneBy({ email: req.body.email });
  if (!admin) {
    throw new Error(`Email not found`);
  }

  const password_ok = await bcrypt.compare(req.body.password, admin.password);
  if (!password_ok) {
    throw new Error(`Wrong password`);
  }

  return {
    token: signJWT({ id: admin.id }),
    admin,
  };
};
