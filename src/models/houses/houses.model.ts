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

export interface IHouses {
  id: number;
  job_id: number;
  address: string;
  company: string;
  sagerecordnumber: number;
}

export interface IHousesCreationAttributes
  extends Optional<
  IHouses,
    | "id"
    | "job_id"
    | "address"
    | "company"
    | "sagerecordnumber"
  > {}

@Table({
  tableName: "houses",
  schema: "eh_tasks",
  timestamps: false,
})
export class House
  extends Model<IHouses, IHousesCreationAttributes>
  implements IHouses
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number;
  @Column(DataTypes.NUMBER)
  job_id!: number;
  @Column(DataTypes.STRING(255))
  address!: string;
  @Column(DataTypes.STRING(255))
  company!: string;
  @Column(DataTypes.NUMBER)
  sagerecordnumber!: number;
}

db.addModels([House]);



