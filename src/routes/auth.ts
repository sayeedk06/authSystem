import express from "express";
import apiRoutes from "../utils/apiRoutes.js";

const router = express.Router();

import {loginController, registrationController} from "../controllers/authControllers.js"



router.post(apiRoutes.LOGIN, loginController)
router.post(apiRoutes.REGISTER, registrationController)

export default router;