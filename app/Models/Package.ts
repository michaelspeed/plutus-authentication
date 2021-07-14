import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid4 } from 'uuid'

export default class Package extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public config: JSON

  @beforeCreate()
  public static async createUUID(model: Package) {
    if (!model.id) {
      model.id = uuid4()
    }
  }
}
