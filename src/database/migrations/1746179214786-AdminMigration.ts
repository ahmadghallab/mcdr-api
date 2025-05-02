import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AdminMigration1746179214786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "admins",
            new TableColumn({
                name: "permissions",
                type: "json",
                isNullable: true
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("admins", "permissions")
    }

}
