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
import db from "../../config/database";






const { INTERNAL_SERVER_ERROR } = AppStrings;
const { OK, BAD_REQUEST, ERROR } = HTTP_STATUS_CODES;


export const getTrasactions = async (req: Request, res: Response) => {
  const {short_name} = req.query;
  try {
    if(short_name == "All")
    {
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
    }
      else{
        const [results, metadata] =  await db.query('SELECT tr.id,tr.rguidb,tr.house_id,tr.vendor_id,tr.cost_code_id,tr.description,tr.amount,tr.sagedate,tr.company, '+
        ' h.id,h.job_id,h.address,h.company,h.sagerecordnumber,v.id,v.sagerecordnumber,v.vendor_id,v.name,v.company, '+
        'c.id,c.sagerecordnumber,c.cost_code_id,c.name,c.company '+
        ' FROM  eh_tasks. transactions tr '+
        ' INNER JOIN eh_tasks.houses h ON tr.house_id = h.id '+
        'INNER JOIN eh_tasks.house_budgets hb ON hb.house_id  = h.id '+
        ' INNER JOIN eh_tasks.vendors v ON tr.vendor_id = v.id '+
        ' inner JOIN eh_tasks.cost_codes c ON tr.cost_code_id = c.id '+
        'WHERE  hb.foreman = :email', {
          replacements: { email: short_name }
        });

        const msg = AppStrings.queried("vendors");
   // console.log(vendor);
    return response(res, OK, msg, results, null);
      }
  } catch (error) {

    return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
  }
};

export const getFilterTrasactions = async (req: Request, res: Response) => {
  //const 
    const {short_name,id_house,id_vendor,id_cost_code,date} = req.query;

 
    
  console.log(short_name);
    try {
      if(short_name == "All")
      {
        Transaction.hasMany(House,{foreignKey: 'id',sourceKey:'house_id'});
        Transaction.hasMany(Vendor,{foreignKey:'id',sourceKey:'vendor_id'});
        Transaction.hasMany(CostCode,{foreignKey:'id',sourceKey:'cost_code_id'});

        var houseCondition = id_house?{ [Op.or]: {house_id: id_house?.toString()}} : null;
        var vendorCondition = id_vendor?{ [Op.or]: {vendor_id: id_vendor?.toString()}} : null;
        var costCondition = id_cost_code?{ [Op.or]: {cost_code_id: id_cost_code?.toString()}} : null;
        var dateCondition = date?{ [Op.gte]: {sagedate: date?.toString()}} : null;

      const vendor= await Transaction.findAll({
          limit:1000,
          where: {...houseCondition,...vendorCondition,...costCondition,...dateCondition},
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
      }
      else{
        const [results, metadata] =  await db.query('SELECT tr.id,tr.rguidb,tr.house_id,tr.vendor_id,tr.cost_code_id,tr.description,tr.amount,tr.sagedate,tr.company, '+
                                                    ' h.id,h.job_id,h.address,h.company,h.sagerecordnumber,v.id,v.sagerecordnumber,v.vendor_id,v.name,v.company, '+
                                                    ' c.id,c.sagerecordnumber,c.cost_code_id,c.name,c.company FROM  eh_tasks. transactions tr '+
                                                    ' INNER JOIN eh_tasks.houses h ON tr.house_id = h.id '+
                                                     ' INNER JOIN eh_tasks.house_budgets hb ON hb.house_id  = h.id '+
                                                    ' INNER JOIN eh_tasks.vendors v ON tr.vendor_id = v.id '+
                                                    ' inner JOIN eh_tasks.cost_codes c ON tr.cost_code_id = c.id '+
                                                    ' WHERE  hb.foreman = :foreman OR  tr.house_id = :house_id OR tr.vendor_id= :vendor_id OR tr.cost_code_id =:cost_code_id OR  tr.sagedate = :date',{
                              
                          replacements: { foreman: short_name , house_id: id_house, vendor_id: id_vendor,cost_code_id: id_cost_code,date: date}
                          });

                        const msg = AppStrings.queried("vendors");
                        // console.log(vendor);
                        return response(res, OK, msg, results, null);
      }
        
    } catch (error) {
  
      return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
    }
  };
  
  export const getTotalAmountTrasactions = async (req: Request, res: Response) => {
    const {date,short_name} = req.query;
    
    try {
      if(short_name == "All")
      {
        Transaction.hasMany(House,{foreignKey: 'id',sourceKey:'house_id'});
        Transaction.hasMany(Vendor,{foreignKey:'id',sourceKey:'vendor_id'});
        Transaction.hasMany(CostCode,{foreignKey:'id',sourceKey:'cost_code_id'});
        
      const vendor= await Transaction.findAll({
        where:{sagedate:{ [Op.gte]: !date}},
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
      }
      else{
        const [results, metadata] =  await db.query('SELECT SUM(tr.amount) AS total_amount '+
                                  ' FROM  eh_tasks. transactions tr '+
                                ' INNER JOIN eh_tasks.houses h ON tr.house_id = h.id '+
                                ' INNER JOIN eh_tasks.house_budgets hb ON hb.house_id = h.id '+
                              ' where hb.foreman =:foreman ',{
                              
                          replacements: { foreman: short_name }
                          });

const msg = AppStrings.queried("vendors");
// console.log(vendor);
return response(res, OK, msg, results, null);
      }
     
    } catch (error) {
  
      return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
    }
  };
  export const getTotalAmountYearTrasactions = async (req: Request, res: Response) => {
    const {date,short_name} = req.query;
    console.log(date);
   
    try {
      if(short_name == "All")
      {
        Transaction.hasMany(House,{foreignKey: 'id',sourceKey:'house_id'});
        Transaction.hasMany(Vendor,{foreignKey:'id',sourceKey:'vendor_id'});
        Transaction.hasMany(CostCode,{foreignKey:'id',sourceKey:'cost_code_id'});
          const vendor= await Transaction.findAll({
          where:{sagedate:{ [Op.gte]: !date}},
        attributes: [
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
          ],
          raw: true
          
        
      });
      const msg = AppStrings.queried("vendors");
     // console.log(vendor);
      return response(res, OK, msg, vendor, null);
      }
      else{
        const [results, metadata] =  await db.query('SELECT SUM(tr.amount) AS total_amount '+
                                                  ' FROM  eh_tasks. transactions tr '+
                                                ' INNER JOIN eh_tasks.houses h ON tr.house_id = h.id '+
                                                ' INNER JOIN eh_tasks.house_budgets hb ON hb.house_id = h.id '+
                                              ' where tr.sagedate >= :date '+
                                              '  AND hb.foreman =:foreman ',{
                                               
          replacements: { date: date,foreman: short_name }
        });

        const msg = AppStrings.queried("vendors");
   // console.log(vendor);
    return response(res, OK, msg, results, null);
      }
        
    } catch (error) {
  
      return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
    }
  };