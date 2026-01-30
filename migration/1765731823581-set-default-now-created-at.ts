import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultNowCreatedAt1765731823581 implements MigrationInterface {
    name = 'SetDefaultNowCreatedAt1765731823581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "Admin" ALTER COLUMN "created_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "created_at" SET DEFAULT NOW()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Admin" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}
