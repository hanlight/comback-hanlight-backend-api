import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class Calendar extends Model<Calendar> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public year: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public month: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public date: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public detail: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
