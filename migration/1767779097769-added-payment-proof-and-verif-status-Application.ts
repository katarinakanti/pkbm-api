import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPaymentProofAndVerifStatusApplication1767779097769 implements MigrationInterface {
    name = 'AddedPaymentProofAndVerifStatusApplication1767779097769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" ADD "payment_verification_status" boolean`);
        await queryRunner.query(`ALTER TABLE "Application" ADD "payment_proof_url" character varying(500)`);
        await queryRunner.query(`ALTER TYPE "public"."Application_status_application_enum" RENAME TO "Application_status_application_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Application_status_application_enum" AS ENUM('SUBMITTED', 'VERIFIED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" TYPE "public"."Application_status_application_enum" USING "status_application"::"text"::"public"."Application_status_application_enum"`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" SET DEFAULT 'SUBMITTED'`);
        await queryRunner.query(`DROP TYPE "public"."Application_status_application_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Application_status_application_enum_old" AS ENUM('SUBMITTED', 'VERIFIED', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" TYPE "public"."Application_status_application_enum_old" USING "status_application"::"text"::"public"."Application_status_application_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" SET DEFAULT 'SUBMITTED'`);
        await queryRunner.query(`DROP TYPE "public"."Application_status_application_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Application_status_application_enum_old" RENAME TO "Application_status_application_enum"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP COLUMN "payment_proof_url"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP COLUMN "payment_verification_status"`);
    }

}
