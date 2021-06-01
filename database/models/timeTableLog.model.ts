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

import User from './user.model';

@Table({
  timestamps: true,
})
export default class TimeTableLog extends Model<TimeTableLog> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public grade: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public major: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public classNum: number;

  @CreatedAt
  public createdAt: Date;

  @BelongsTo(() => User)
  public user: User;
}
