import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import Board from './board.model';
import BoardCommentLike from './boardCommentLike.model';
import BoardPatchLog from './boardPatchLog.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class BoardComment extends Model<BoardComment> {
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

  @AllowNull(true)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => Board, {
    onDelete: 'CASCADE',
  })
  public board: Board;

  @HasMany(() => BoardPatchLog)
  public boardPatchLog: BoardPatchLog[];

  @HasMany(() => BoardCommentLike)
  public boardCommentLike: BoardCommentLike[];
}
