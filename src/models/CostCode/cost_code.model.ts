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

export interface ICostCode {
  id: number;
  sagerecordnumber: number;
  cost_code_id: number;
  name: string;
  company: string;
}

export interface ICostCodeCreationAttributes
  extends Optional<
  ICostCode,
    | "id"
    | "sagerecordnumber"
    | "cost_code_id"
    | "name"
    | "company"
  > {}

@Table({
  tableName: "cost_codes",
  schema: "eh_tasks",
  timestamps: false,
})
export class CostCode
  extends Model<ICostCode, ICostCodeCreationAttributes>
  implements ICostCode
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number;
  @Column(DataTypes.INTEGER)
  sagerecordnumber!: number;
  @Column(DataTypes.INTEGER)
  cost_code_id!: number;
  @Column(DataTypes.STRING(255))
  name!: string;
  @Column(DataTypes.STRING(255))
  company!: string;
}

db.addModels([CostCode]);



