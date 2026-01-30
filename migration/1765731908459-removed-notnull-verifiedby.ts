import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedNotnullVerifiedby1765731908459 implements MigrationInterface {
    name = 'RemovedNotnullVerifiedby1765731908459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_571800281c6ef3b7c4a2c5a1a8a"`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "verified_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_571800281c6ef3b7c4a2c5a1a8a" FOREIGN KEY ("verified_by") REFERENCES "Admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_571800281c6ef3b7c4a2c5a1a8a"`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "verified_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_571800281c6ef3b7c4a2c5a1a8a" FOREIGN KEY ("verified_by") REFERENCES "Admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
