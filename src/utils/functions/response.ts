import { Response } from "express";
import { Logger } from "../../classes/log";
export const response = async (
  res: Response,
  code: number,
  msg: string,
  data: any,
  error: any
) => {
  let errorStr = "";
  if (error) {
    console.log(error);
    errorStr = String(error);
    Logger.log(errorStr);
  }
  return res
    .status(code)
    .json({
      msg,
      data,
      error: error ? errorStr : null,
      isError: code > 400 ? true : false,
    });
};
