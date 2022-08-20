/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { response } from "../../utils/functions/response";
import HTTP_STATUS_CODES from "../../utils/constants/httpStatusCodes";
import { AppStrings } from "../../utils/constants/strings";

import { House } from "../../models/houses/houses.model";
import db from "../../config/database";


const { INTERNAL_SERVER_ERROR } = AppStrings;
const { OK, BAD_REQUEST, ERROR } = HTTP_STATUS_CODES;


export const getHouses = async (req: Request, res: Response) => {
  const {short_name} = req.body;
  try {
    if(short_name =='All')
    {
      const consulta= await House.findAll();
      const msg = AppStrings.queried("houses");
      return response(res, OK, msg, consulta, null);
    }
    else
    {
      const [results, metadata] = await db.query('SELECT  h.id,h.job_id,h.address,h.company,h.sagerecordnumber  '+
                                     ' FROM eh_tasks.house_budgets hb '+
                                     ' INNER JOIN eh_tasks.houses h ON h.id = hb.house_id '+
                                     ' WHERE foreman = :foreman', {
                                      replacements: { foreman: short_name }
                                    });

      const msg = AppStrings.queried("houses");
      return response(res, OK, msg, results, null);
    }
  } catch (error) {

    return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
  }
};


