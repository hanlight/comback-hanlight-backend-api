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
export default class BoardLike extends Model<BoardLike> {
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

  @Column(DataType.STRING)
  public user_name: string;

  @CreatedAt
  public createdAt: Date;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => Board, {
    onDelete: 'CASCADE',
  })
  public board: Board;
}
