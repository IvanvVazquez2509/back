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

export interface IHouseBudget {
  id: number;
  house_id: number;
  updated_file_on_epoch: number;
  created_on: Date;
  updated_on: Date;
  address: string;
  job_id: number;
  plan_name: string;
  subdivision: string;
  foreman: string;
  start_date: Date;
  company: string;
}

export interface IHouseBudgetCreationAttributes
  extends Optional<
  IHouseBudget,
    | "id"
    | "house_id"
    | "updated_file_on_epoch"
    | "created_on"
    | "updated_on"
    |"address"|"job_id"|"plan_name"|"subdivision"|"foreman"|"start_date"

  > {}

@Table({
  tableName: "house_budgets",
  schema: "eh_tasks",
  timestamps: false,
})
export class HouseBudget
  extends Model<IHouseBudget, IHouseBudgetCreationAttributes>
  implements IHouseBudgetCreationAttributes
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number;
  @Column(DataTypes.INTEGER)
  house_id!: number;
  @Column(DataTypes.INTEGER)
  updated_file_on_epoch!: number;
  @Column(DataTypes.DATE)
  created_on!: Date;
  @Column(DataTypes.DATE)
  updated_on!: Date;
  @Column(DataTypes.STRING(255))
  address!: string;
  @Column(DataTypes.INTEGER)
  job_id!: number;
  @Column(DataTypes.STRING(255))
  plan_name!: string;
  @Column(DataTypes.STRING(255))
  subdivision!: string;
  @Column(DataTypes.STRING(255))
  foreman!: string;
  @Column(DataTypes.DATE)
  start_date!: Date;
  @Column(DataTypes.STRING(255))
  company!: string;
}

db.addModels([HouseBudget]);



