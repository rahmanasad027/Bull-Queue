import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedNewTableForFiles1733839959144
  implements MigrationInterface
{
  name = 'CreatedNewTableForFiles1733839959144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`url\` varchar(255) NULL, \`file_name\` varchar(255) NOT NULL, \`file_size\` int NOT NULL, \`s3_key\` varchar(255) NOT NULL, \`uploaded_by\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`verification_status\` enum ('pending', 'verified') NOT NULL DEFAULT 'pending', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), INDEX \`IDX_7e7d0b2ed108074ecf6979e3e9\` (\`verification_status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`files\` ADD CONSTRAINT \`FK_63c92c51cd7fd95c2d79d709b61\` FOREIGN KEY (\`uploaded_by\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_63c92c51cd7fd95c2d79d709b61\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7e7d0b2ed108074ecf6979e3e9\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`files\``);
  }
}
