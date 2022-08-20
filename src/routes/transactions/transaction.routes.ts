import {
    getTrasactions,
    getFilterTrasactions,
    getTotalAmountTrasactions,
    getTotalAmountYearTrasactions
  } from "../../controllers/transaction/transaction.controller";
  import { Router } from "express";

  const router = Router();
  
  
  
  router.get(
    "/",
    [],
    getTrasactions
  );
  
  router.get(
    "/getFilters",
    [],
    getFilterTrasactions
  );
  router.get(
    "/getAmounts",
    [],
    getTotalAmountTrasactions
  );
  router.get(
    "/getAmount",
    [],
    getTotalAmountYearTrasactions
  );
  
  
  export default router;
  