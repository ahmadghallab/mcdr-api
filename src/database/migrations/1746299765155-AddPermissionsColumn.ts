import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionsColumn1746299765155 implements MigrationInterface {
    name = 'AddPermissionsColumn1746299765155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admins\` ADD \`permissions\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admins\` DROP COLUMN \`permissions\``);
    }

}
