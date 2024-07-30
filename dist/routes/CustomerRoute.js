"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.CustomerRoute = router;
var CommonAuth_1 = require("../middlewares/CommonAuth");
var controllers_1 = require("../controllers");
router.post("/signup", controllers_1.CustomerSignUp);
router.post("/login", controllers_1.CustomerLogin);
router.use(CommonAuth_1.Authenticate);
router.patch("/verify", controllers_1.CustomerVerify);
router.get("/otp", controllers_1.RequestOtp);
router.get("/profile", controllers_1.GetCustomerProfile);
router.patch("/profile", controllers_1.EditCustomerProfile);
router.post("/cart", controllers_1.AddToCart);
router.get("/cart", controllers_1.GetCart);
router.delete("/cart", controllers_1.DeleteCart);
//# sourceMappingURL=CustomerRoute.js.map