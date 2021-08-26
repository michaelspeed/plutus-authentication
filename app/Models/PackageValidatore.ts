import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid4 } from 'uuid'
import License from "App/Models/License";

export default class PackageValidator extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public validator: string

  @column()
  public shortValidator: string

  @belongsTo(() => License)
  public license: BelongsTo<typeof License>

  @beforeCreate()
  public static async createUUID(model: PackageValidator) {
    if (!model.id) {
      model.id = uuid4()
    }
  }
}
