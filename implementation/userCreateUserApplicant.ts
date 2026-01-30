import moment from "moment";
import { T_userCreateUserApplicant } from "../types/api/userCreateUserApplicant";
import { UserApplicant } from "../types/model/table/UserApplicant";
import { getUserFromAuthHeader } from "../jwt";

export const userCreateUserApplicant: T_userCreateUserApplicant = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);
    const [ua, count] = await UserApplicant.findAndCountBy({ id_user: user.id, });
    // console.log(count);
    if (count >= 5) {
        throw new Error(`Maksimal jumlah pendaftar adalah 5. Hapus pendaftar lain jika ingin membuat pendaftar baru. `)
    }
    const user_applicant = new UserApplicant();
    user_applicant.id_user = user.id;
    user_applicant.fullname = req.body.fullname;
    user_applicant.email = req.body.email;
    user_applicant.phone_number = req.body.phone_number;
    user_applicant.address = req.body.address || '';
    user_applicant.gender = req.body.gender;
    user_applicant.birth_date = moment(req.body.birth_date, 'YYYYMMDD').toDate();
    user_applicant.birth_place = req.body.birth_place || '';
    user_applicant.religion = req.body.religion || '';

    await user_applicant.save();

    return user_applicant;
}