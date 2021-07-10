import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Packages extends BaseSchema {
  protected tableName = 'packages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('name')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
