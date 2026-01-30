import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedRequiredFieldsApplication1765730956988 implements MigrationInterface {
    name = 'ChangedRequiredFieldsApplication1765730956988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" DROP COLUMN "parent_dad_fullname"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP COLUMN "parent_mom_fullname"`);
        await queryRunner.query(`ALTER TABLE "Application" ADD "parent_fullname" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "parent_phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "parent_email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "grade_terakhir" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "asal_sekolah" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "student_status" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "student_status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "asal_sekolah" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "grade_terakhir" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "parent_email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "parent_phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" DROP COLUMN "parent_fullname"`);
        await queryRunner.query(`ALTER TABLE "Application" ADD "parent_mom_fullname" text`);
        await queryRunner.query(`ALTER TABLE "Application" ADD "parent_dad_fullname" text`);
    }

}
