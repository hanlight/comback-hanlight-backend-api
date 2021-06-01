import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import NoticeApproveLog from './noticeApproveLog.model';
import NoticeViewLog from './noticeViewLog.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Notice extends Model<Notice> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.UUID)
  public user_pk: string;

  @Column(DataType.STRING)
  public user_name: string;

  @Column(DataType.STRING)
  public title: string;

  @Column(DataType.TEXT)
  public content: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  public approved: boolean;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @BelongsTo(() => User)
  public user: User;

  @HasMany(() => NoticeViewLog)
  public noticeViewLog: NoticeViewLog;
  @HasMany(() => NoticeApproveLog)
  public noticeApproveLog: NoticeApproveLog[];
}
