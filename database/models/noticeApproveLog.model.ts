import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  DeletedAt,
} from 'sequelize-typescript';

import Notice from './notice.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class NoticeApproveLog extends Model<NoticeApproveLog> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Notice)
  @Column(DataType.INTEGER)
  public notice_pk: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public user_pk: string;

  @Column(DataType.STRING)
  public user_name: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  public approved: boolean;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: 'C' | 'R' | 'U' | 'D';

  @Column(DataType.STRING)
  public title: string;

  @Column(DataType.TEXT)
  public content: string;

  @CreatedAt
  public createdAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @BelongsTo(() => Notice)
  public notice: Notice;
  @BelongsTo(() => User)
  public user: User;
}
