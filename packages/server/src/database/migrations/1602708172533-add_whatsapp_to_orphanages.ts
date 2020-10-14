import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class addWhatsappToOrphanages1602708172533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('orphanages', new TableColumn({
        name: 'whatsapp',
        type: 'number',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('orphanages', 'whatsapp');
    }
}
