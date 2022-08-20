/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { response } from "../../utils/functions/response";
import HTTP_STATUS_CODES from "../../utils/constants/httpStatusCodes";
import { AppStrings } from "../../utils/constants/strings";
import {
 Vendor
} from "../../models/vendors/vendor.model";
import {  Transaction} from "../../models/transactions/transaction.model";
import db from "../../config/database";





const { INTERNAL_SERVER_ERROR } = AppStrings;
const { OK, BAD_REQUEST, ERROR } = HTTP_STATUS_CODES;


export const getVendors = async (req: Request, res: Response) => {

  try {
    
    const projects = await db.query

    const [results, metadata] =  await db.query('SELECT distinct(v.id),v.vendor_id AS vendor_id,v.name,v.company '+
                                                ' FROM eh_tasks.transactions tr '+
                                               ' INNER JOIN eh_tasks.vendors v ON v.id = tr.vendor_id '+
                                                ' WHERE tr.sagedate BETWEEN ( current_date - INTERVAL \'3 month\') AND CURRENT_DATE '+
                                                ' group by  v.id,v.vendor_id ,v.name,v.company '+
                                                'ORDER BY v.vendor_id asc', {
    });
 
    const msg = AppStrings.queried("vendors");
    return response(res, OK, msg, results, null);



  } catch (error) {

    return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
  }
};


