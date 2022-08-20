/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { response } from "../../utils/functions/response";
import HTTP_STATUS_CODES from "../../utils/constants/httpStatusCodes";
import { AppStrings } from "../../utils/constants/strings";
import { User } from "../../models/users/user.model";
import db from "../../config/database";

const { INTERNAL_SERVER_ERROR } = AppStrings;
const { OK, BAD_REQUEST, ERROR } = HTTP_STATUS_CODES;

export const getUserByEmail = async (req: Request, res: Response) => {

    const {email} = req.body;
    try {
        const [results, metadata] =  await db.query('SELECT * FROM eh_tasks.users where  email = :email', {
            replacements: { email: email }
          });
       
        const msg = AppStrings.queried("user");
        // console.log(vendor);
         return response(res, OK, msg, results, null);
    } catch (error) {
        return response(res, ERROR, INTERNAL_SERVER_ERROR, null, error);
    }
}