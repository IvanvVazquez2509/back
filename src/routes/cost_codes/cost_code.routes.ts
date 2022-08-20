
  import { Router } from "express";
  import { getCostCodes } from "../../controllers/cost_codes/cost_code.controller";

  const router = Router();
  
  router.get(
    "/",
    [
   
    ],
    getCostCodes
  );
  
  export default router;
  