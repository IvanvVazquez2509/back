
  import { Router } from "express";
  import { getHouses } from "../../controllers/houses/houses.controller";

  const router = Router();
  
  router.get(
    "/",
    [
   
    ],
    getHouses
  );
  
  export default router;
  