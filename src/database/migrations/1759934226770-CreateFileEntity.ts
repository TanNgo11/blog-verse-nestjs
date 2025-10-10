import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFileEntity1759934226770 implements MigrationInterface {
  name = 'CreateFileEntity1759934226770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "filename" character varying(255) NOT NULL, "key" character varying(500) NOT NULL, "url" character varying(500) NOT NULL, "mimeType" character varying(100) NOT NULL, "size" bigint NOT NULL, "uploadedBy" character varying(50), "metadata" text, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a5c218dfdf6ad6092fed2230a8" ON "files" ("key") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5c218dfdf6ad6092fed2230a8"`,
    );
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
