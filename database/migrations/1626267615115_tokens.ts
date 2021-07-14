import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tokens extends BaseSchema {
  protected tableName = 'token'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('createdAt', { useTz: true })
      table.dateTime('updatedAt', { useTz: true })
      table.text('hashedToken')
      table.text('type')
      table.text('sentTo')
      table.string('userId')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
