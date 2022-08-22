/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { response } from "../../utils/functions/response";
import HTTP_STATUS_CODES from "../../utils/constants/httpStatusCodes";
import { AppStrings } from "../../utils/constants/strings";

import { CostCode } from "../../models/CostCode/cost_code.model";


const { INTERNAL_SERVER_ERROR } = AppStrings;
const { OK, BAD_REQUEST, ERROR } = HTTP_STATUS_CODES;


export const getCostCodes = async (req: Request, res: Response) => {

  try {
    const consulta= await CostCode.findAll();
    const msg = AppStrings.queried("costCodes");
    return response(res, OK, msg, consulta, null);



  } catch (error) {

    return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
  }
};


