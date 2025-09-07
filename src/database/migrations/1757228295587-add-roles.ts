import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoles1757228295587 implements MigrationInterface {
  name = 'AddRoles1757228295587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_roles" ("account_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_e200e60cf6abbac5085cc4d6365" PRIMARY KEY ("account_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0e94d53a5ed46deaae79475e42" ON "account_roles" ("account_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70186a37bf7b84898bd08f61fb" ON "account_roles" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "account_roles" ADD CONSTRAINT "FK_0e94d53a5ed46deaae79475e427" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_roles" ADD CONSTRAINT "FK_70186a37bf7b84898bd08f61fba" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_roles" DROP CONSTRAINT "FK_70186a37bf7b84898bd08f61fba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_roles" DROP CONSTRAINT "FK_0e94d53a5ed46deaae79475e427"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_70186a37bf7b84898bd08f61fb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0e94d53a5ed46deaae79475e42"`,
    );
    await queryRunner.query(`DROP TABLE "account_roles"`);
  }
}
