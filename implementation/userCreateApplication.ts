import { getUserFromAuthHeader } from "../jwt";
import { T_userCreateApplication } from "../types/api/userCreateApplication";
import { Application } from "../types/model/table/Application";

export const userCreateApplication: T_userCreateApplication = async req => {
    const user = await getUserFromAuthHeader(req.headers.authorization);
    const found = await Application.findOneBy({
        id_user_applicant: req.body.id_user_applicant
    });
    if (found) {
        throw new Error(`Pendaftaran sudah pernah dibuat untuk Pendaftar ini, id: ${req.body.id_user_applicant}`)
    }

    const application = new Application();
    application.id_user = user.id;
    application.id_user_applicant = req.body.id_user_applicant;
    application.application_type = req.body.application_type;
    application.nik = req.body.nik;
    if (req.body.nisn) {
        application.nisn = req.body.nisn;
    }
    application.parent_fullname = req.body.parent_fullname;
    application.parent_phone = req.body.parent_phone;
    application.parent_email = req.body.parent_email;
    application.pendidikan_terakhir = req.body.pendidikan_terakhir;
    application.grade_terakhir = req.body.grade_terakhir;
    application.asal_sekolah = req.body.asal_sekolah;
    application.student_status = req.body.student_status;

    if (!req.body.alasan_pindah && req.body.student_status === 'MUTASIPINDAHAN') {
        throw new Error(`Alasan pindah wajib untuk siswa mutasi`)
    }
    if (req.body.alasan_pindah) {
        application.alasan_pindah = req.body.alasan_pindah;
    }
    application.kk_url = req.body.kk_url;
    application.akta_lahir_url = req.body.akta_lahir_url;
    application.ktp_ortu_url = req.body.ktp_ortu_url;
    application.photo_url = req.body.photo_url;
    application.selfie_url = req.body.selfie_url;

    if (!req.body.ijazah_terakhir_url && req.body.application_type !== 'SD') {
        throw new Error(`Ijazah terakhir wajib untuk pendaftar ${req.body.application_type}`)
    }
    if (req.body.ijazah_terakhir_url) {
        application.ijazah_terakhir_url = req.body.ijazah_terakhir_url;
    }

    if (!req.body.raport_url && req.body.application_type !== 'SD') {
        throw new Error(`Raport terakhir wajib untuk pendaftar ${req.body.application_type}`)
    }
    if (req.body.raport_url) {
        application.raport_url = req.body.raport_url;
    }

    if (req.body.surat_pindah_url) {
        application.surat_pindah_url = req.body.surat_pindah_url;
    }

    await application.save();
    return application;

}