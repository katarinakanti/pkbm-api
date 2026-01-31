import { signJWT } from "../jwt";
import bcrypt from "bcrypt";
import { T_loginUser } from "../types/api/loginUser";
import { User } from "../types/model/table/User";

export const loginUser: T_loginUser = async (req) => {
  const user = await User.findOneBy({ email: req.body.email });
  if (!user) {
    throw new Error(`Email not found`);
  }

  const password_ok = await bcrypt.compare(req.body.password, user.password);
  if (!password_ok) {
    throw new Error(`Wrong password`);
  }

  return {
    token: signJWT({ id: user.id }),
    user,
  };
};
