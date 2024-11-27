import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedPasswordFieldInCreateUserTable1732707802286
  implements MigrationInterface
{
  name = 'AddedPasswordFieldInCreateUserTable1732707802286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
  }
}
