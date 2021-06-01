import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export default class Meal extends Model<Meal> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public month: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public date: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public detail: string;
}
