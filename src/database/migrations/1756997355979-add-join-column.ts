import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJoinColumn1756997355979 implements MigrationInterface {
  name = 'AddJoinColumn1756997355979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ADD "profileId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "UQ_33814c603c3b523e5423ad957d4" UNIQUE ("profileId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_33814c603c3b523e5423ad957d4" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "FK_33814c603c3b523e5423ad957d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "UQ_33814c603c3b523e5423ad957d4"`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "profileId"`);
  }
}
