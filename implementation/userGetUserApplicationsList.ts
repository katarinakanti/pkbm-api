import moment from "moment";
import { getUserFromAuthHeader } from "../jwt";
import { T_userGetUserApplicationsList } from "../types/api/userGetUserApplicationsList";
import { Application } from "../types/model/table/Application";
import { UserApplicant } from "../types/model/table/UserApplicant";
import { ApplicationType } from "../types/model/enum/ApplicationType";
import { ApplicationStatus } from "../types/model/enum/ApplicationStatus";
import { Between } from "typeorm";

export const userGetUserApplicationsList: T_userGetUserApplicationsList = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);
    const where: any = {};

    if (req.query.id_user_applicant) {
        const applicant = await UserApplicant.findOneBy({
            id: req.query.id_user_applicant,
            id_user: user.id
        });

        if (!applicant) {
            throw new Error('User applicant not found');
        }
        where.id_user_applicant = req.query.id_user_applicant;
    }

    if (req.query.status_application) {
        where.status_application = req.query.status_application as ApplicationStatus;
    }

    if (req.query.application_type) {
        where.application_type = req.query.application_type as ApplicationType;
    }

    if (req.query.created_at) {
        const d = moment(String(req.query.created_at), 'YYYYMMDD');
        where.created_at = Between(d.startOf('day').toDate(), d.endOf('day').toDate());
    }

    where.id_user = user.id;

    const [data, total] = await Application.findAndCount({
        where: where,
        take: req.query.limit ?? 10,
        skip: req.query.offset ?? 0
    });

    return { total, data }
}
