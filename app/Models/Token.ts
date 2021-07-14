import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Token extends BaseModel {
  public static  table = 'token'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true, columnName: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updatedAt' })
  public updatedAt: DateTime
}
