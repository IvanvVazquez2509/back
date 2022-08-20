import {
    getUserByEmail,
  
  } from "../../controllers/users/user.controller";
  import { Router } from "express";

  const router = Router();
  
  router.get(
    "/getUser",
    [],
    getUserByEmail
  );
  
  
  export default router;
  