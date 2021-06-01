import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class MealOrder extends Model<MealOrder> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public order: string;

  @Default(1)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public count: number;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
