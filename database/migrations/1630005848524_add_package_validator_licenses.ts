import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PackageValidators extends BaseSchema {
  protected tableName = 'package_validators'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.foreign('license').references('licenses.id')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('license')
    })
  }
}
