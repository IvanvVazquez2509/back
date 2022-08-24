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

export interface IHouseBudgetTransaction {
  id: number;
  house_budget_id: number;
  cost_code_id: number;
  task_description: string;
  vendor_id: string;
  amount: number;
  completed_by_foreman: boolean;
}

export interface IHouseBudgetTransactionCreationAttributes
  extends Optional<
  IHouseBudgetTransaction,
    | "id"
    | "house_budget_id"
    | "cost_code_id"
    | "task_description"
    | "vendor_id"
    |"amount"|"completed_by_foreman"

  > {}

@Table({
  tableName: "house_budget_transactions",
  schema: "eh_tasks",
  timestamps: false,
})
export class HouseBudgetTransaction
  extends Model<IHouseBudgetTransaction, IHouseBudgetTransactionCreationAttributes>
  implements IHouseBudgetTransactionCreationAttributes
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number;
  @Column(DataTypes.INTEGER)
  house_budget_id!: number;
  @Column(DataTypes.INTEGER)
  cost_code_id!: number;
  @Column(DataTypes.STRING(255))
  task_description!: string;
  @Column(DataTypes.STRING(255))
  vendor_id!: string;
  @Column(DataTypes.NUMBER)
  amount!: number;
  @Column(DataTypes.BOOLEAN)
  completed_by_foreman!: boolean;
}

db.addModels([HouseBudgetTransaction]);



