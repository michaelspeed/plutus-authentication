import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid4 } from 'uuid'
import User from "App/Models/User";
import Package from "App/Models/Package";

export enum LicenseClassType {
  LOCAL = "LOCAL",
  CROSS = "CROSS",
  ONLINE = "ONLINE"
}

export enum LicenseTimeType {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  HALF = "HALF",
  YEARLY = "YEARLY"
}

export default class License extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public licenseClassType: LicenseClassType

  @column()
  public licenseTimeType: LicenseTimeType

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>

  @belongsTo(() => Package)
  public package: BelongsTo<typeof Package>

  @beforeCreate()
  public static async createUUID(model: License) {
    if (!model.id) {
      model.id = uuid4()
    }
  }
}
