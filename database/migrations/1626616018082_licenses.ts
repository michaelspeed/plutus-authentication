import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {LicenseClassType, LicenseTimeType} from "App/Models/License";

export default class Licenses extends BaseSchema {
  protected tableName = 'licenses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.enum('licenseClassType', Object.keys(LicenseClassType))
      table.enum('licenseTimeType', Object.keys(LicenseTimeType))
      table.string('owner')
      table.string('package')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
