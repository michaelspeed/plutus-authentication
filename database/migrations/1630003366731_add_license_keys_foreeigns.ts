import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Licenses extends BaseSchema {
  protected tableName = 'licenses'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.foreign('owner').references('users.id')
      table.foreign('package').references('packages.id')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('owner')
    })
  }
}
