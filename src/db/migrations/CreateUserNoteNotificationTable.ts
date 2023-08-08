import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserNoteNotificationTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_note_notification',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'dailyNotificationEnabled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'userId',
            type: 'int',
            isUnique: true,
          },
        ],
      }),
    );

    // Add foreign key constraint
    await queryRunner.createForeignKey(
      'user_note_notification',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_note_notification');
  }
}
