import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PackageValidators extends BaseSchema {
  protected tableName = 'package_validators'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('validator')
      table.string('shortValidator')
      table.string('license')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
