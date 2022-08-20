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

export interface IVendor {
  id: number;
  sagerecordnumber: number;
  vendor_id: string,
  name: string,
  company: string;
}

export interface IVendorCreationAttributes
  extends Optional<
    IVendor,
    "id" | "sagerecordnumber" | "vendor_id" | "name" | "company"
  > {}

@Table({
  tableName: "vendors",
  schema: "eh_tasks",
  timestamps: false,
})
export class Vendor
  extends Model<IVendor, IVendorCreationAttributes>
  implements IVendor
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number;
  @Column(DataTypes.INTEGER)
  sagerecordnumber!: number;
  @Column(DataTypes.STRING(255))
  vendor_id!: string;
  @Column(DataTypes.STRING(255))
  name!: string;
  @Column(DataTypes.STRING(255))
  company!: string;
}

db.addModels([Vendor]);
