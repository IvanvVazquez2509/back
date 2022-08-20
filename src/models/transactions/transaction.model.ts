/* eslint-disable @typescript-eslint/no-empty-interface */
import { Optional } from "sequelize/types";
import * as DataTypes from "sequelize";
import db from "../../config/database";
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

export interface ITransaction {
  id: number;
  rguidb: number;
  house_id: number,
  vendor_id: number,
  cost_code_id: number,
  description: string,
  amount: number,
  sagedate: Date,
  company: string
}

export interface ITransactionCreationAttributes
  extends Optional<
  ITransaction,
    "id" | "rguidb" | "house_id" | "vendor_id" | "cost_code_id" |"description" |"amount" |"sagedate"|"company"
  > {}

@Table({
  tableName: "transactions",
  schema: "eh_tasks",
  timestamps: false,
})
export class Transaction
  extends Model<ITransaction, ITransactionCreationAttributes>
  implements ITransaction
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number;
  @Column(DataTypes.INTEGER)
  rguidb!: number;
  @Column(DataTypes.INTEGER)
  house_id!: number;
  @Column(DataTypes.INTEGER)
  vendor_id!: number;
  @Column(DataTypes.INTEGER)
  cost_code_id!: number;
  @Column(DataTypes.STRING(255))
  description!: string;
  @Column(DataTypes.DECIMAL(39,2))
  amount!: number;
  @Column(DataTypes.DATE)
  sagedate!: Date;
  @Column(DataTypes.STRING(255))
  company!: string;
}

db.addModels([Transaction]);
