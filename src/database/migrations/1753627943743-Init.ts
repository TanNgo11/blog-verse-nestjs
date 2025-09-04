import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1753627943743 implements MigrationInterface {
  name = 'Init1753627943743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "username" character varying(100) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "firstName" character varying(100) NOT NULL, "middleName" character varying(100), "lastName" character varying(100) NOT NULL, "bio" text, "avatarUrl" character varying(255), "dateOfBirth" date, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "username" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "lastLogin" TIMESTAMP, CONSTRAINT "UQ_477e3187cedfb5a3ac121e899c9" UNIQUE ("username"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."roles_rolename_enum" AS ENUM('ADMIN', 'USER', 'MANAGER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "roleName" "public"."roles_rolename_enum" NOT NULL, "description" text, CONSTRAINT "UQ_992f24b9d80eb1312440ca577f1" UNIQUE ("roleName"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."roles_rolename_enum"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
