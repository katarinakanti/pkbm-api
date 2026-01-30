import { getUserFromAuthHeader } from "../jwt";
import { T_userGetUserApplicationById } from "../types/api/userGetUserApplicationById";
import { Application } from "../types/model/table/Application";

export const userGetUserApplicationById: T_userGetUserApplicationById = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);

    const application = await Application.findOneBy({
        id: req.path.id,
        id_user: user.id
    });

    if (!application) {
        throw new Error(`Application dengan ID: ${req.path.id} dan id user ${user.id} tidak dapat ditemukan.`)
    }

    return application;

}