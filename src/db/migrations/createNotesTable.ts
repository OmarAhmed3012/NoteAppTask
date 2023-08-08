import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateNoteTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'note',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'noteTitle',
            type: 'varchar',
          },
          {
            name: 'noteBody',
            type: 'text',
          },
          {
            name: 'noteMediaFiles',
            type: 'text[]', // PostgreSQL array of text
            isNullable: true,
          },
          {
            name: 'creationDateTime',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'isDeleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'noteTypeId',
            type: 'int',
          },
        ],
      }),
    );

    // Add foreign key constraints
    await queryRunner.createForeignKey(
      'note',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'note',
      new TableForeignKey({
        columnNames: ['noteTypeId'],
        referencedTableName: 'note_type',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('note');
  }
}
