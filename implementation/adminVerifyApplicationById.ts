import { getAdminFromAuthHeader, getUserFromAuthHeader } from "../jwt";
import { T_adminVerifyApplicationById } from "../types/api/adminVerifyApplicationById";
import { ApplicationStatus } from "../types/model/enum/ApplicationStatus";
import { Application } from "../types/model/table/Application";

export const adminVerifyApplicationById: T_adminVerifyApplicationById = async req => {
    const admin = await getAdminFromAuthHeader(req.headers.authorization);
    // console.log(Number(req.path.id_application))
    const application = await Application.findOneBy({
        id: Number(req.path.id_application)
    });

    if (!application) {
        throw new Error(`Application dengan ID: ${req.path.id_application} tidak dapat ditemukan.`)
    }

    application.status_application = req.body.application_status;

    if (req.body.application_status === ApplicationStatus.VERIFIED) {
        application.verified_by = admin.id;
        application.verified_at = new Date();
    }

    if (req.body.notes) {
        application.notes = req.body.notes;
    }

    await application.save();

    return application;

}