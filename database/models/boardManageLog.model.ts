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

import Board from './board.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class BoardManageLog extends Model<BoardManageLog> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public board_pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: 'board' | 'comment';

  @AllowNull(true)
  @Column(DataType.STRING)
  public reason: string;

  @CreatedAt
  public CreatedAt: Date;

  @BelongsTo(() => Board)
  public board: Board;
  @BelongsTo(() => User)
  public user: User;
}
