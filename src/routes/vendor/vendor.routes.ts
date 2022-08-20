
  import { Router } from "express";
  import { getVendors } from "../../controllers/vendors/vendors.controller";

  const router = Router();
  
  router.get(
    "/",
    [
   
    ],
    getVendors
  );
  
  export default router;
  