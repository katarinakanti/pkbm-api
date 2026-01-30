import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIdUserApplication1765733341319 implements MigrationInterface {
    name = 'AddedIdUserApplication1765733341319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" ADD "id_user" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Application" ADD CONSTRAINT "FK_53b69008ca6c4a1657557b65004" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Application" DROP CONSTRAINT "FK_53b69008ca6c4a1657557b65004"`);
        await queryRunner.query(`ALTER TABLE "Application" DROP COLUMN "id_user"`);
    }

}
