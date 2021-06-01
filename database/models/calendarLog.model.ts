import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Calendar from './calendar.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class CalendarLog extends Model<CalendarLog> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: 'C' | 'U' | 'D';

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public month: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public date: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public detail: string;

  @CreatedAt
  public createdAt: Date;

  @BelongsTo(() => User)
  public user: User;
}
