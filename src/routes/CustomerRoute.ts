import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

import { Authenticate } from "../middlewares/CommonAuth";

import {
  CustomerLogin,
  CustomerSignUp,
  EditCustomerProfile,
  GetCustomerProfile,
  CustomerVerify,
  RequestOtp,
  CreateOrder,
  GetOrders,
  GetOrderById,
  AddToCart,
  DeleteCart,
  GetCart,
  // VerifyOffer,
  //  CreatePayment
} from "../controllers";

router.post("/signup", CustomerSignUp);
router.post("/login", CustomerLogin);
router.use(Authenticate);
router.patch("/verify", CustomerVerify);
router.get("/otp", RequestOtp);

router.get("/profile", GetCustomerProfile);
router.patch("/profile", EditCustomerProfile);

router.post("/cart", AddToCart);
router.get("/cart", GetCart);
router.delete("/cart", DeleteCart);

// router.get('/offer/verify/:id', VerifyOffer)

// router.post('/create-payment', CreatePayment)


router.post("/create-order", CreateOrder);
router.get("/orders", GetOrders);
router.get("/order/:id", GetOrderById);

export { router as CustomerRoute };
