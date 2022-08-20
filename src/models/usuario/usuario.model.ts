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

export interface IUsuario {
  id: number;
  email: string;
  name: string,
  short_name: string,
  active: boolean;
}

export interface IUsuarioCreationAttributes
  extends Optional<
    IUsuario,
    "id" | "email" | "name" | "short_name" | "active"
  > {}

@Table({
  tableName: "users",
  schema: "eh_tasks",
  timestamps: false,
})
export class Usuario
  extends Model<IUsuario, IUsuarioCreationAttributes>
  implements IUsuario
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number;
  @Column(DataTypes.STRING(255))
  email!: string;
  @Column(DataTypes.STRING(255))
  name!: string;
  @Column(DataTypes.STRING(255))
  short_name!: string;
  @Column(DataTypes.BOOLEAN)
  active!: boolean;
}

db.addModels([Usuario]);
