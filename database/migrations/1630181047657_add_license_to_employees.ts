import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Licenses extends BaseSchema {
  protected tableName = 'licenses'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('employeeLicenseId')
      table.foreign('employeeLicenseId').references('users.id')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('employeeLicenseId')
    })
  }
}
