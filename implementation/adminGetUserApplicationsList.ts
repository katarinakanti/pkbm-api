import moment from "moment";
import { getAdminFromAuthHeader, getUserFromAuthHeader } from "../jwt";
import { T_adminGetUserApplicationsList } from "../types/api/adminGetUserApplicationsList";
import { ApplicationStatus } from "../types/model/enum/ApplicationStatus";
import { ApplicationType } from "../types/model/enum/ApplicationType";
import { StudentStatus } from "../types/model/enum/StudentStatus";
import { Application } from "../types/model/table/Application";
import { User } from "../types/model/table/User";
import { UserApplicant } from "../types/model/table/UserApplicant";
import { Between } from "typeorm";

export const adminGetUserApplicationsList: T_adminGetUserApplicationsList = async req => {
    const admin = await getAdminFromAuthHeader(req.headers.authorization);
    const where: any = {};

    if (req.query.id_user) {
        const user = await User.findOneBy({
            id: req.query.id_user,
        });

        if (!user) {
            throw new Error('User not found');
        }
        where.id_user = req.query.id_user;
    }

    if (req.query.id_user_applicant) {
        const applicant = await UserApplicant.findOneBy({
            id: req.query.id_user_applicant
        });

        if (!applicant) {
            throw new Error('User applicant not found');
        }
        where.id_user_applicant = req.query.id_user_applicant;
    }

    if (req.query.application_status) {
        where.status_application = req.query.application_status as ApplicationStatus;
    }

    if (req.query.application_type) {
        where.application_type = req.query.application_type as ApplicationType;
    }

    if (req.query.student_status) {
        where.student_status = req.query.student_status as StudentStatus;
    }

    if (req.query.created_at) {
        const d = moment(String(req.query.created_at), 'YYYYMMDD');
        where.created_at = Between(d.startOf('day').toDate(), d.endOf('day').toDate());
    }

    if (req.query.verified_at) {
        const d = moment(String(req.query.verified_at), 'YYYYMMDD');
        where.verified_at = Between(d.startOf('day').toDate(), d.endOf('day').toDate());
    }


    const [data, total] = await Application.findAndCount({
        where: where,
        take: req.query.limit ?? 10,
        skip: req.query.offset ?? 0
    });

    return { total, data };

}