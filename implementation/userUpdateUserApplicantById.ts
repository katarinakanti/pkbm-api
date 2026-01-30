import moment from "moment";
import { getUserFromAuthHeader } from "../jwt";
import { T_userUpdateUserApplicantById } from "../types/api/userUpdateUserApplicantById";
import { UserApplicant } from "../types/model/table/UserApplicant";

export const userUpdateUserApplicantById: T_userUpdateUserApplicantById = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);
    const user_applicant = await UserApplicant.findOneBy({
        id: req.path.id,
        id_user: user.id
    });
    if (!user_applicant) {
        throw new Error(`User Applicant dengan ID: ${req.path.id} dan id user ${user.id} tidak dapat ditemukan.`)
    }

    if (req.body.fullname) {
        user_applicant.fullname = req.body.fullname;
    }

    if (req.body.email) {
        user_applicant.email = req.body.email;
    }

    if (req.body.phone_number) {
        user_applicant.phone_number = req.body.phone_number;
    }

    if (req.body.address) {
        user_applicant.address = req.body.address;
    }

    if (req.body.gender) {
        user_applicant.gender = req.body.gender;
    }

    if (req.body.birth_date) {
        user_applicant.birth_date = moment(req.body.birth_date, 'YYYYMMDD').toDate();
    }

    if (req.body.birth_place) {
        user_applicant.birth_place = req.body.birth_place;
    }

    if (req.body.religion) {
        user_applicant.religion = req.body.religion;
    }

    await user_applicant.save();

    return user_applicant;

}