/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { response } from "../../utils/functions/response";
import HTTP_STATUS_CODES from "../../utils/constants/httpStatusCodes";
import { AppStrings } from "../../utils/constants/strings";
import db from "../../config/database";


const { INTERNAL_SERVER_ERROR } = AppStrings;
const { OK, BAD_REQUEST, ERROR } = HTTP_STATUS_CODES;


export const getBudgets = async (req: Request, res: Response) => {

  try {
    const [results, metadata] =  await db.query('select hb.company,hb.plan_name,hb.subdivision, hb.foreman, hb.address, '+
                                            ' cc."name" as cost_code, v."name" as vendor,hbt.task_description,sum(hbt.amount) amount '+
                                            ' from eh_tasks.house_budgets hb, eh_tasks.cost_codes cc, eh_tasks.vendors v, '+
                                            ' eh_tasks.house_budget_transactions hbt '+
                                            ' where hbt.house_budget_id = hb.id and cc.cost_code_id = hbt.cost_code_id '+
                                            ' and v.id = hbt.vendor_id::int8 '+
                                            ' group by hb.company,hb.plan_name,hb.subdivision, hb.foreman, hb.address, '+
                                            ' cc."name", v."name",hbt.task_description');

        const msg = AppStrings.queried("vendors");
   // console.log(vendor);
    return response(res, OK, msg, results, null);

  } catch (error) {

    return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
  }
};


