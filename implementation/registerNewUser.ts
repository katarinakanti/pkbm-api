import { IsNull, Not } from "typeorm";
import bcrypt from 'bcrypt';
import { v4 } from "uuid";
import { signJWT } from "../jwt";
import { T_registerNewUser } from "../types/api/registerNewUser";
import { User } from "../types/model/table/User";

export const registerNewUser: T_registerNewUser = async req => {
  if (await User.existsBy({ email: req.body.email })) {
    throw new Error(`email sudah terdaftar`);
  }
  const user = new User();

  user.fullname = req.body.fullname;
  user.email = req.body.email;
  user.phone_number = req.body.phone_number;
  user.password = await bcrypt.hash(req.body.password, 10);

  user.email_verification_token = v4().replace(/\-/g, '');
  user.created_at = new Date();

  await user.save();
  return {
    token: signJWT(user.id),
    user
  };
}
