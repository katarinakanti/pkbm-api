import { getUserFromAuthHeader } from "../jwt";
import { T_userGetUserApplicantsList } from "../types/api/userGetUserApplicantsList";
import { UserApplicant } from "../types/model/table/UserApplicant";

export const userGetUserApplicantsList: T_userGetUserApplicantsList = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);
    const list = await UserApplicant.findBy({ id_user: user.id, });

    return list;

}