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
import Notice from './notice.model';
import User from './user.model';

@Table({
  timestamps: false,
})
export default class NoticeViewLog extends Model<NoticeViewLog> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @ForeignKey(() => Notice)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public notice_pk: number;

  @CreatedAt
  public createdAt: Date;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => Notice, {
    onDelete: 'CASCADE',
  })
  public notice: Notice;
}
