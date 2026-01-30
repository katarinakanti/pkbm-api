import { getAdminFromAuthHeader } from "../jwt";
import { T_adminVerifyPayment } from "../types/api/adminVerifyPayment";
import { Application } from "../types/model/table/Application";

export const adminVerifyPayment: T_adminVerifyPayment = async req => {
    const admin = await getAdminFromAuthHeader(req.headers.authorization);

    const application = await Application.findOneBy({
        id: Number(req.path.id)
    });

    if (!application) {
        throw new Error(`Application dengan ID: ${req.path.id} tidak dapat ditemukan.`)
    }

    if(!application.payment_status){
        throw new Error(`Application ID ${req.path.id}, user belum melakukan pembayaran`)
    }

    application.payment_verification_status = req.body.payment_verification_status;

    await application.save();

    return application;

}