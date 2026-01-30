import { getUserFromAuthHeader } from "../jwt";
import { T_userMakePayment } from "../types/api/userMakePayment";
import { Application } from "../types/model/table/Application";

export const userMakePayment: T_userMakePayment = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);

    const application = await Application.findOneBy({
        id: req.path.id,
        id_user: user.id
    });

    if (!application) {
        throw new Error(`Application dengan ID: ${req.path.id} dan id user ${user.id} tidak dapat ditemukan.`)
    }

    application.payment_proof_url = req.body.payment_proof_url;
    application.payment_status = true;
    application.paid_at = new Date();
    await application.save();

    return application;

}