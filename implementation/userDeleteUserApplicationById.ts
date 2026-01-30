import { getUserFromAuthHeader } from "../jwt";
import { T_userDeleteUserApplicationById } from "../types/api/userDeleteUserApplicationById";
import { Application } from "../types/model/table/Application";

export const userDeleteUserApplicationById: T_userDeleteUserApplicationById = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);
    await Application.delete({
        id: req.path.id,
        id_user: user.id
    });

    return true;
}