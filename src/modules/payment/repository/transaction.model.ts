import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "transactions",
  timestamps: false,
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false, field: "orderId" })
  orderId: string;

  @Column({ allowNull: false })
  amount: number;

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false, field: "createdAt" })
  createdAt: Date;

  @Column({ allowNull: false, field: "updatedAt" })
  updatedAt: Date;
}