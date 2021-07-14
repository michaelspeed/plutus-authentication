import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sessions extends BaseSchema {
  protected tableName = 'session'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('createdAt', { useTz: true })
      table.dateTime('updatedAt', { useTz: true })
      table.dateTime('expiresAt', { useTz: true }).nullable()
      table.string('handle').unique()
      table.text('hashedSessionToken').nullable()
      table.text('antiCSRFToken').nullable()
      table.text('publicData').nullable()
      table.text('privateData').nullable()
      table.string('userId').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
