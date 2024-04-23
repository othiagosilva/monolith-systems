import { Model } from "sequelize-typescript";
import { Column, PrimaryKey, Table, BelongsTo } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: "invoiceItems",
  timestamps: false,
})
export class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @BelongsTo(() => InvoiceModel, { foreignKey: "invoice_id" })
  Invoice: InvoiceModel[];

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}