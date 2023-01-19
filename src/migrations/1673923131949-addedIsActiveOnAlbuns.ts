import { MigrationInterface, QueryRunner } from "typeorm";

export class addedIsActiveOnAlbuns1673923131949 implements MigrationInterface {
    name = 'addedIsActiveOnAlbuns1673923131949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "duration" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "isPerformer" boolean NOT NULL DEFAULT false, "isAdmin" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "musicId" uuid, "userId" uuid, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "musics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "duration" TIME NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "genreId" uuid, "performerId" uuid, CONSTRAINT "PK_a2e622f30df5467a860991af728" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "duration" TIME NOT NULL DEFAULT '00:00:00', "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "performerId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "musicsToPlaylists" ("playlistsId" uuid NOT NULL, "musicsId" uuid NOT NULL, CONSTRAINT "PK_a72a51a3945707232502189d470" PRIMARY KEY ("playlistsId", "musicsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_380b472353ef026803ce2441be" ON "musicsToPlaylists" ("playlistsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c21c2692fead666193f4aba9a" ON "musicsToPlaylists" ("musicsId") `);
        await queryRunner.query(`CREATE TABLE "musicsFeats" ("musicsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_2116bbeec82a7fb85836d88c0f5" PRIMARY KEY ("musicsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2a1c7fa3b6a685dcd52141012" ON "musicsFeats" ("musicsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_258be4815f1b65223656037262" ON "musicsFeats" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "albumsToMusics" ("albumsId" uuid NOT NULL, "musicsId" uuid NOT NULL, CONSTRAINT "PK_c7361caddca2d3754869e54a95d" PRIMARY KEY ("albumsId", "musicsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3a2909cb3c0bad48d565c23f0f" ON "albumsToMusics" ("albumsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8bd3be74e541fc29a41b0313b2" ON "albumsToMusics" ("musicsId") `);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_572135cd24930f0d4e7d2fea6cf" FOREIGN KEY ("musicId") REFERENCES "musics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musics" ADD CONSTRAINT "FK_38bd6037e16cf96f5682a067e93" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musics" ADD CONSTRAINT "FK_19cf800df7a98c10681b5fdc09f" FOREIGN KEY ("performerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_0458a636e47207ef1cd77c5faa9" FOREIGN KEY ("performerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" ADD CONSTRAINT "FK_380b472353ef026803ce2441bed" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" ADD CONSTRAINT "FK_2c21c2692fead666193f4aba9a5" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "musicsFeats" ADD CONSTRAINT "FK_e2a1c7fa3b6a685dcd521410124" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "musicsFeats" ADD CONSTRAINT "FK_258be4815f1b65223656037262d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albumsToMusics" ADD CONSTRAINT "FK_3a2909cb3c0bad48d565c23f0f6" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "albumsToMusics" ADD CONSTRAINT "FK_8bd3be74e541fc29a41b0313b2a" FOREIGN KEY ("musicsId") REFERENCES "musics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "albumsToMusics" DROP CONSTRAINT "FK_8bd3be74e541fc29a41b0313b2a"`);
        await queryRunner.query(`ALTER TABLE "albumsToMusics" DROP CONSTRAINT "FK_3a2909cb3c0bad48d565c23f0f6"`);
        await queryRunner.query(`ALTER TABLE "musicsFeats" DROP CONSTRAINT "FK_258be4815f1b65223656037262d"`);
        await queryRunner.query(`ALTER TABLE "musicsFeats" DROP CONSTRAINT "FK_e2a1c7fa3b6a685dcd521410124"`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" DROP CONSTRAINT "FK_2c21c2692fead666193f4aba9a5"`);
        await queryRunner.query(`ALTER TABLE "musicsToPlaylists" DROP CONSTRAINT "FK_380b472353ef026803ce2441bed"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_0458a636e47207ef1cd77c5faa9"`);
        await queryRunner.query(`ALTER TABLE "musics" DROP CONSTRAINT "FK_19cf800df7a98c10681b5fdc09f"`);
        await queryRunner.query(`ALTER TABLE "musics" DROP CONSTRAINT "FK_38bd6037e16cf96f5682a067e93"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_572135cd24930f0d4e7d2fea6cf"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bd3be74e541fc29a41b0313b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a2909cb3c0bad48d565c23f0f"`);
        await queryRunner.query(`DROP TABLE "albumsToMusics"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_258be4815f1b65223656037262"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2a1c7fa3b6a685dcd52141012"`);
        await queryRunner.query(`DROP TABLE "musicsFeats"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c21c2692fead666193f4aba9a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_380b472353ef026803ce2441be"`);
        await queryRunner.query(`DROP TABLE "musicsToPlaylists"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "musics"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }

}
