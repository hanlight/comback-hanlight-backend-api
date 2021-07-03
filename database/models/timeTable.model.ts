import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export default class TimeTable extends Model<TimeTable> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public grade: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public classNum: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public day: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public detail: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public th: number;
}
