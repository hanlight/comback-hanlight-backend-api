import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Board from './board.model';

@Table({
  timestamps: false,
})
export default class BoardImage extends Model<BoardImage> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Board)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public board_pk: number;

  @Column(DataType.STRING)
  public file: string;

  @BelongsTo(() => Board, {
    onDelete: 'CASCADE',
  })
  public board: Board;
}
