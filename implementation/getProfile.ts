import { getUserFromAuthHeader } from "../jwt";
import { T_getProfile } from "../types/api/getProfile";

export const getProfile: T_getProfile = async req => {
  return await getUserFromAuthHeader(req.headers.authorization);
}