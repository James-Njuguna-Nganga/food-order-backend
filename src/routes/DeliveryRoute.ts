import express, { Request, Response, NextFunction } from "express";

import { Authenticate } from "../middlewares/CommonAuth";
import { DeliveryLogin, DeliverySignUp, EditDeliveryProfile, GetDeliveryProfile } from "../controllers";


const router = express.Router();

router.post("/signup", DeliverySignUp);
router.post("/login", DeliveryLogin);

router.use(Authenticate);

router.put('/change-status',);

router.get("/profile", GetDeliveryProfile);

router.patch("/profile", EditDeliveryProfile);



export { router as DeliveryRoute };