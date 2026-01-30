import { getUserFromAuthHeader } from "../jwt";
import { T_userDeleteUserApplicantById } from "../types/api/userDeleteUserApplicantById";
import { UserApplicant } from "../types/model/table/UserApplicant";

export const userDeleteUserApplicantById: T_userDeleteUserApplicantById = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);
    await UserApplicant.delete({
        id: req.path.id,
        id_user: user.id
    });

    return true;
}