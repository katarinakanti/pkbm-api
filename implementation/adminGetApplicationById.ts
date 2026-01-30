import { getAdminFromAuthHeader, getUserFromAuthHeader } from "../jwt";
import { T_adminGetApplicationById } from "../types/api/adminGetApplicationById";
import { Application } from "../types/model/table/Application";

export const adminGetApplicationById: T_adminGetApplicationById = async req => {
    const admin = await getAdminFromAuthHeader(req.headers.authorization);

    const application = await Application.findOneBy({
        id: req.path.id
    });

    if (!application) {
        throw new Error(`Application dengan ID: ${req.path.id} tidak dapat ditemukan.`)
    }

    return application;

}