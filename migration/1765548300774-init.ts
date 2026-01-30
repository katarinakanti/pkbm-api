import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1765548300774 implements MigrationInterface {
    name = 'Init1765548300774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "fullname" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "phone_number" character varying(100), "password" character varying(500) NOT NULL, "email_verification_token" character varying(500) NOT NULL, "email_reset_password_token" character varying(500), "update_email_otp" character varying(10), "update_email_token" character varying(100), "verified_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."UserApplicant_gender_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TABLE "UserApplicant" ("id" SERIAL NOT NULL, "id_user" integer NOT NULL, "fullname" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "phone_number" character varying(100), "address" text, "gender" "public"."UserApplicant_gender_enum" NOT NULL, "birth_date" date NOT NULL, "birth_place" character varying(500), "religion" character varying(30), CONSTRAINT "PK_c0b04ee5d11f1ee91127312df54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Admin" ("id" SERIAL NOT NULL, "fullname" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "password" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_3a489f4a44372ff150d7924dc3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Application_status_application_enum" AS ENUM('SUBMITTED', 'VERIFIED', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TYPE "public"."Application_application_type_enum" AS ENUM('SD', 'SMP', 'SMA')`);
        await queryRunner.query(`CREATE TYPE "public"."Application_pendidikan_terakhir_enum" AS ENUM('TK', 'SD', 'SMP', 'SMA', 'S1')`);
        await queryRunner.query(`CREATE TYPE "public"."Application_student_status_enum" AS ENUM('BARU', 'MUTASIPINDAHAN')`);
        await queryRunner.query(`CREATE TABLE "Application" ("id" SERIAL NOT NULL, "id_user_applicant" integer NOT NULL, "status_application" "public"."Application_status_application_enum" NOT NULL, "application_type" "public"."Application_application_type_enum" NOT NULL, "nisn" character varying(10), "nik" character varying(16) NOT NULL, "parent_dad_fullname" text, "parent_mom_fullname" text, "parent_phone" character varying(100), "parent_email" character varying(500), "pendidikan_terakhir" "public"."Application_pendidikan_terakhir_enum" NOT NULL, "grade_terakhir" character varying(10), "asal_sekolah" text, "student_status" "public"."Application_student_status_enum", "alasan_pindah" text, "kk_url" character varying(500) NOT NULL, "akta_lahir_url" character varying(500) NOT NULL, "ktp_ortu_url" character varying(500) NOT NULL, "photo_url" character varying(500) NOT NULL, "selfie_url" character varying(500) NOT NULL, "ijazah_terakhir_url" character varying(500), "raport_url" character varying(500), "surat_pindah_url" character varying(500), "created_at" TIMESTAMP NOT NULL, "verified_at" TIMESTAMP, "verified_by" integer NOT NULL, "notes" text, "updated_at" TIMESTAMP, "payment_status" boolean, "paid_at" TIMESTAMP, CONSTRAINT "PK_2b6c2221234b3e00ce964afd9ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UserApplicant" ADD CONSTRAINT "FK_4a87f9943d55df06f68a9b9d624" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_4afa54700396fba27a9983df132" FOREIGN KEY ("id_user_applicant") REFERENCES "UserApplicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_571800281c6ef3b7c4a2c5a1a8a" FOREIGN KEY ("verified_by") REFERENCES "Admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_571800281c6ef3b7c4a2c5a1a8a"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_4afa54700396fba27a9983df132"`);
        await queryRunner.query(`ALTER TABLE "UserApplicant" DROP CONSTRAINT "FK_4a87f9943d55df06f68a9b9d624"`);
        await queryRunner.query(`DROP TABLE "Application"`);
        await queryRunner.query(`DROP TYPE "public"."Application_student_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Application_pendidikan_terakhir_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Application_application_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Application_status_application_enum"`);
        await queryRunner.query(`DROP TABLE "Admin"`);
        await queryRunner.query(`DROP TABLE "UserApplicant"`);
        await queryRunner.query(`DROP TYPE "public"."UserApplicant_gender_enum"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
