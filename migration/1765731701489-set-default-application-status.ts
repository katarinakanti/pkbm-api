import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultApplicationStatus1765731701489 implements MigrationInterface {
    name = 'SetDefaultApplicationStatus1765731701489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" SET DEFAULT 'SUBMITTED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "status_application" DROP DEFAULT`);
    }

}
