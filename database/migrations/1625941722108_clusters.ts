import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clusters extends BaseSchema {
  protected tableName = 'clusters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('region')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
