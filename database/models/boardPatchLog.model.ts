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
import BoardComment from './boardComment.model';
import User from './user.model';

@Table({
  timestamps: false,
})
export default class BoardPatchLog extends Model<BoardPatchLog> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: 'board' | 'comment';

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: string;

  @ForeignKey(() => Board)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public board_pk: number;

  @ForeignKey(() => BoardComment)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  public comment_pk: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  public past_content: string;

  @CreatedAt
  public createdAt: Date;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => Board)
  public board: Board;

  @BelongsTo(() => BoardComment)
  public boardComment: BoardComment;
}
