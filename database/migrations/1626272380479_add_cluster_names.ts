import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cluster extends BaseSchema {
  protected tableName = 'clusters'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.text('name')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('name')
    })
  }
}
