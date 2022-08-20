/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppStrings } from "../utils/constants/strings";
import { Model } from "sequelize-typescript";
const axios = require('axios').default;
export const checkItExistsInDB = async (model: any, id: number) => {
  if (!id) return;
  const result = await model.findByPk(id);
  if (!result) {
    throw new Error(AppStrings.objectDoesntExist(id));
  }
};


export const checkIfAcountExists = async ( account: number) => {
  if (!account) return;
  const response= await axios.get('https://pagosjmascuauhtemoc.gob.mx/apiMovil/api/Pagos/ConsultarSaldo/'+account).then((resp:any)=>{
    const result =resp.data;
    return result;
  }).catch(
    (error:any)=>{
      return null;
    }
  );

  return response;
 
};

