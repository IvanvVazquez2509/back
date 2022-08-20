/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { response } from "../../utils/functions/response";
import HTTP_STATUS_CODES from "../../utils/constants/httpStatusCodes";
import { AppStrings } from "../../utils/constants/strings";
import {
 Transaction
} from "../../models/transactions/transaction.model";
import { House } from "../../models/houses/houses.model";
import { Vendor } from "../../models/vendors/vendor.model";
import { CostCode } from "../../models/CostCode/cost_code.model";
import { Op } from "sequelize";
import sequelize from "sequelize";





const { INTERNAL_SERVER_ERROR } = AppStrings;
const { OK, BAD_REQUEST, ERROR } = HTTP_STATUS_CODES;


export const getTrasactions = async (req: Request, res: Response) => {
    
  try {
      Transaction.hasMany(House,{foreignKey: 'id',sourceKey:'house_id'});
      Transaction.hasMany(Vendor,{foreignKey:'id',sourceKey:'vendor_id'});
      Transaction.hasMany(CostCode,{foreignKey:'id',sourceKey:'cost_code_id'});
    const vendor= await Transaction.findAll({
     
        limit:1000,
        include: [
        {
        model: House,
        as: 'Houses'
        },
        {
            model: Vendor,
            as:"Vendors"
        },
        {
            model: CostCode,
            as:"CostCodes"
        }
    ]
  });
    const msg = AppStrings.queried("vendors");
   // console.log(vendor);
    return response(res, OK, msg, vendor, null);
  } catch (error) {

    return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
  }
};

export const getFilterTrasactions = async (req: Request, res: Response) => {
    const {id_house,id_vendor,id_cost_code,date} = req.body;

    try {
        Transaction.hasMany(House,{foreignKey: 'id',sourceKey:'house_id'});
        Transaction.hasMany(Vendor,{foreignKey:'id',sourceKey:'vendor_id'});
        Transaction.hasMany(CostCode,{foreignKey:'id',sourceKey:'cost_code_id'});
      const vendor= await Transaction.findAll({
          limit:1000,
          where:{[Op.or]:[{house_id: id_house} ,{vendor_id: id_vendor}, {cost_code_id: id_cost_code},{sagedate:{ [Op.gte]: date}} ]},
          order:[['sagedate','desc']],
          include: [
          {
          model: House,
          as: 'Houses'
          },
          {
              model: Vendor,
              as:"Vendors"
          },
          {
              model: CostCode,
              as:"CostCodes"
          }
      ]});
      const msg = AppStrings.queried("vendors");
     // console.log(vendor);
      return response(res, OK, msg, vendor, null);
    } catch (error) {
  
      return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
    }
  };
  
  export const getTotalAmountTrasactions = async (req: Request, res: Response) => {
    const {date} = req.body;

    try {
        Transaction.hasMany(House,{foreignKey: 'id',sourceKey:'house_id'});
        Transaction.hasMany(Vendor,{foreignKey:'id',sourceKey:'vendor_id'});
        Transaction.hasMany(CostCode,{foreignKey:'id',sourceKey:'cost_code_id'});
      const vendor= await Transaction.findAll({
        where:{sagedate:{ [Op.gte]: date}},
        attributes: [
            'Houses.id','vendor_id',
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
          ],
          include: [
            {
            model: House,
            as: 'Houses'
            }],
          group: ['Houses.id','vendor_id'],
          raw: true
          
        
      });
      const msg = AppStrings.queried("vendors");
     // console.log(vendor);
      return response(res, OK, msg, vendor, null);
    } catch (error) {
  
      return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
    }
  };
  export const getTotalAmountYearTrasactions = async (req: Request, res: Response) => {
    const {date} = req.body;

    try {
        Transaction.hasMany(House,{foreignKey: 'id',sourceKey:'house_id'});
        Transaction.hasMany(Vendor,{foreignKey:'id',sourceKey:'vendor_id'});
        Transaction.hasMany(CostCode,{foreignKey:'id',sourceKey:'cost_code_id'});
      const vendor= await Transaction.findAll({
        where:{sagedate:{ [Op.gte]: date}},
        attributes: [
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
          ],
          raw: true
          
        
      });
      const msg = AppStrings.queried("vendors");
     // console.log(vendor);
      return response(res, OK, msg, vendor, null);
    } catch (error) {
  
      return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
    }
  };