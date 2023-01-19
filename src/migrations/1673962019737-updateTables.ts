import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTables1673962019737 implements MigrationInterface {
    name = 'updateTables1673962019737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlists" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "albums" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD "duration" TIME NOT NULL DEFAULT '00:00:00'`);
        await queryRunner.query(`ALTER TABLE "musics" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "albums" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "albums" ALTER COLUMN "isActive" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "musics" ALTER COLUMN "isActive" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD "duration" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP COLUMN "isActive"`);
    }

}
