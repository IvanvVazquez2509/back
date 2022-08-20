import {
  getUsuario,

} from "../../controllers/usuario/usuario.controller";
import { Router } from "express";
import { check } from "express-validator";
import { AppStrings } from "../../utils/constants/strings";
import { validateFields } from "../../middlewares/validateFields";
import { validateJWT } from "../../middlewares/validateJWT";
import validatePermission from "../../middlewares/validatePermission";
import { PERMISSIONS } from "../../utils/constants/roles";
import { checkItExistsInDB } from "../../middlewares/validateObjectExists";
import { Usuario } from "../../models/usuario/usuario.model";
import { House } from "../../models/houses/houses.model";
const router = Router();



router.get(
  "/",
  [],
  getUsuario
);



export default router;
