
  import { Router } from "express";
  import { getBudgets } from "../../controllers/budgets/budget.controller"

  const router = Router();
  
  router.get(
    "/",
    [
   
    ],
    getBudgets
  );
  
  export default router;
  