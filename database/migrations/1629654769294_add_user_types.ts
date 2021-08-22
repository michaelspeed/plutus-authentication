import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {UserType} from "App/Models/User";

export default class User extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.enum('type', Object.values(UserType))
        .defaultTo(UserType.MASTER)
        .notNullable()
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('type')
    })
  }
}
