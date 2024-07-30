"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePayment = exports.DeleteCart = exports.GetCart = exports.AddToCart = exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOtp = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignUp = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var utility_1 = require("../utility");
var models_1 = require("../models");
var Customer_dto_1 = require("../dto/Customer.dto");
var CustomerSignUp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customerInputs, inputErrors, email, phone, password, salt, userPassword, _a, otp, expiry, existingCustomer, result, signature;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                customerInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.CreateCustomerInputs, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(customerInputs, {
                        validationError: { target: true },
                    })];
            case 1:
                inputErrors = _b.sent();
                if (inputErrors.length > 0) {
                    return [2 /*return*/, res.status(400).json(inputErrors)];
                }
                email = customerInputs.email, phone = customerInputs.phone, password = customerInputs.password;
                return [4 /*yield*/, (0, utility_1.GenerateSalt)()];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, (0, utility_1.GeneratePassword)(password, salt)];
            case 3:
                userPassword = _b.sent();
                _a = (0, utility_1.GenerateOtp)(), otp = _a.otp, expiry = _a.expiry;
                console.log(otp, expiry);
                return [4 /*yield*/, models_1.Customer.findOne({ email: email })];
            case 4:
                existingCustomer = _b.sent();
                if (existingCustomer !== null) {
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: "a  user exists with the provided email" })];
                }
                return [4 /*yield*/, models_1.Customer.create({
                        email: email,
                        password: userPassword,
                        salt: salt,
                        phone: phone,
                        otp: otp,
                        otp_expiry: expiry,
                        firstName: "",
                        lastName: "",
                        address: "",
                        verified: false,
                        lat: 0,
                        lng: 0,
                        orders: [],
                    })];
            case 5:
                result = _b.sent();
                if (!result) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, utility_1.onRequestOTP)(otp, phone)];
            case 6:
                _b.sent();
                signature = (0, utility_1.GenerateSignature)({
                    _id: String(result._id),
                    email: result.email,
                    verified: result.verified,
                });
                return [2 /*return*/, res.status(201).json({
                        signature: signature,
                        verified: result.verified,
                        email: result.email,
                    })];
            case 7: return [2 /*return*/, res.status(400).json({ message: "error with signup" })];
        }
    });
}); };
exports.CustomerSignUp = CustomerSignUp;
var CustomerLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var loginInputs, loginErrors, email, password, customer, validation, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loginInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.UserLoginInputs, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(loginInputs, {
                        validationError: { target: false },
                    })];
            case 1:
                loginErrors = _a.sent();
                if (loginErrors.length > 0) {
                    return [2 /*return*/, res.status(400).json(loginErrors)];
                }
                email = loginInputs.email, password = loginInputs.password;
                return [4 /*yield*/, models_1.Customer.findOne({ email: email })];
            case 2:
                customer = _a.sent();
                if (!customer) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, utility_1.ValidatePassword)(password, customer.password)];
            case 3:
                validation = _a.sent();
                if (validation) {
                    signature = (0, utility_1.GenerateSignature)({
                        _id: String(customer._id),
                        email: customer.email,
                        verified: customer.verified,
                    });
                    return [2 /*return*/, res.status(201).json({
                            signature: signature,
                            verified: customer.verified,
                            email: customer.email,
                        })];
                }
                _a.label = 4;
            case 4: return [2 /*return*/, res.status(404).json({ message: "Login error" })];
        }
    });
}); };
exports.CustomerLogin = CustomerLogin;
var CustomerVerify = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, customer, profile, otpExpiry, updatedCustomerResponse, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                otp = req.body.otp;
                customer = req.user;
                if (!customer) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.Customer.findById(customer._id)];
            case 1:
                profile = _a.sent();
                if (!profile) return [3 /*break*/, 3];
                otpExpiry = new Date(profile.otp_expiry).getTime();
                if (!(profile.otp === otp && otpExpiry >= Date.now())) return [3 /*break*/, 3];
                profile.verified = true;
                return [4 /*yield*/, profile.save()];
            case 2:
                updatedCustomerResponse = _a.sent();
                signature = (0, utility_1.GenerateSignature)({
                    _id: String(updatedCustomerResponse._id),
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified,
                });
                return [2 /*return*/, res.status(200).json({
                        signature: signature,
                        email: updatedCustomerResponse.email,
                        verified: updatedCustomerResponse.verified,
                    })];
            case 3: return [2 /*return*/, res.status(400).json({ msg: "unable to verify Customer" })];
        }
    });
}); };
exports.CustomerVerify = CustomerVerify;
var RequestOtp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, profile, _a, otp, expiry;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                customer = req.user;
                if (!customer) return [3 /*break*/, 4];
                return [4 /*yield*/, models_1.Customer.findById(customer._id)];
            case 1:
                profile = _b.sent();
                if (!profile) return [3 /*break*/, 4];
                _a = (0, utility_1.GenerateOtp)(), otp = _a.otp, expiry = _a.expiry;
                profile.otp = otp;
                profile.otp_expiry = expiry;
                return [4 /*yield*/, profile.save()];
            case 2:
                _b.sent();
                return [4 /*yield*/, (0, utility_1.onRequestOTP)(otp, profile.phone)];
            case 3:
                _b.sent();
                res
                    .status(200)
                    .json({ message: "OTP sent to your  phone number" });
                _b.label = 4;
            case 4: return [2 /*return*/, res.status(400).json({ message: "Error with Request OTP" })];
        }
    });
}); };
exports.RequestOtp = RequestOtp;
var GetCustomerProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = req.user;
                if (!customer) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.Customer.findById(customer._id)];
            case 1:
                profile = _a.sent();
                if (profile) {
                    return [2 /*return*/, res.status(200).json(profile)];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(400).json({ message: "Error with fetching profile" })];
        }
    });
}); };
exports.GetCustomerProfile = GetCustomerProfile;
var EditCustomerProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, profileInputs, profileErrors, firstName, lastName, address, profile, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = req.user;
                profileInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.EditCustomerProfileInputs, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(profileInputs, {
                        validationError: { target: false },
                    })];
            case 1:
                profileErrors = _a.sent();
                if (profileErrors.length > 0) {
                    return [2 /*return*/, res.status(400).json(profileErrors)];
                }
                firstName = profileInputs.firstName, lastName = profileInputs.lastName, address = profileInputs.address;
                if (!customer) return [3 /*break*/, 4];
                return [4 /*yield*/, models_1.Customer.findById(customer._id)];
            case 2:
                profile = _a.sent();
                if (!profile) return [3 /*break*/, 4];
                profile.firstName = firstName;
                profile.lastName = lastName;
                profile.address = address;
                return [4 /*yield*/, profile.save()];
            case 3:
                result = _a.sent();
                res.status(200).json(result);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.EditCustomerProfile = EditCustomerProfile;
var AddToCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, profile, cartItems, _a, _id_1, unit, food, existFoodItems, index, cartResult;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                customer = req.user;
                if (!customer) return [3 /*break*/, 4];
                return [4 /*yield*/, models_1.Customer.findById(customer._id)];
            case 1:
                profile = _b.sent();
                cartItems = Array();
                _a = req.body, _id_1 = _a._id, unit = _a.unit;
                return [4 /*yield*/, models_1.Food.findById(_id_1)];
            case 2:
                food = _b.sent();
                if (!food) return [3 /*break*/, 4];
                if (!(profile != null)) return [3 /*break*/, 4];
                cartItems = profile.cart;
                if (cartItems.length > 0) {
                    existFoodItems = cartItems.filter(function (item) { return item.food._id.toString() === _id_1; });
                    if (existFoodItems.length > 0) {
                        index = cartItems.indexOf(existFoodItems[0]);
                        if (unit > 0) {
                            cartItems[index] = { food: food, unit: unit };
                        }
                        else {
                            cartItems.splice(index, 1);
                        }
                    }
                    else {
                        cartItems.push({ food: food, unit: unit });
                    }
                }
                else {
                    // add new Item to cart
                    cartItems.push({ food: food, unit: unit });
                }
                if (!cartItems) return [3 /*break*/, 4];
                profile.cart = cartItems;
                return [4 /*yield*/, profile.save()];
            case 3:
                cartResult = _b.sent();
                return [2 /*return*/, res.status(200).json(cartResult.cart)];
            case 4: return [2 /*return*/, res.status(404).json({ msg: "Unable to add to cart!" })];
        }
    });
}); };
exports.AddToCart = AddToCart;
var GetCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = req.user;
                if (!customer) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.Customer.findById(customer._id)];
            case 1:
                profile = _a.sent();
                if (profile) {
                    return [2 /*return*/, res.status(200).json(profile.cart)];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(400).json({ message: "Cart is Empty!" })];
        }
    });
}); };
exports.GetCart = GetCart;
var DeleteCart = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, profile, cartResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = req.user;
                if (!customer) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.Customer.findById(customer._id)
                        .populate("cart.food")
                        .exec()];
            case 1:
                profile = _a.sent();
                if (!(profile != null)) return [3 /*break*/, 3];
                profile.cart = [];
                return [4 /*yield*/, profile.save()];
            case 2:
                cartResult = _a.sent();
                return [2 /*return*/, res.status(200).json(cartResult)];
            case 3: return [2 /*return*/, res.status(400).json({ message: "cart is Already Empty!" })];
        }
    });
}); };
exports.DeleteCart = DeleteCart;
var CreatePayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, _a, amount, paymentMode, offerId, payableAmount, appliedOffer;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                customer = req.user;
                _a = req.body, amount = _a.amount, paymentMode = _a.paymentMode, offerId = _a.offerId;
                payableAmount = Number(amount);
                if (!offerId) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.Offer.findById(offerId)];
            case 1:
                appliedOffer = _b.sent();
                if (appliedOffer) {
                    if (appliedOffer.isActive) {
                        payableAmount = payableAmount - appliedOffer.offerAmount;
                    }
                }
                _b.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.CreatePayment = CreatePayment;
//   const transaction = await Transaction.create({
//     customer: customer._id,
//     vandorId: "",
//     orderId: "",
//     orderValue: payableAmount,
//     offerUsed: offerId || "NA",
//     status: "OPEN",
//     paymentMode: paymentMode,
//     paymentResponse: "Payment is Cash on Delivery",
//   });
//   return res.status(200).json(transaction);
// };
// const assignOrderForDelivery = async (orderId: string, vandorId: string) => {
//   const vandor = await Vandor.findById(vandorId);
//   if (vandor) {
//     const areaCode = vandor.pinCode;
//     const vandorLat = vandor.lat;
//     const vandorLng = vandor.lng;
//     // Find the Available Delivery person
//     const deliveryPerson = await DeliveryUser.find({
//       pincode: areaCode,
//       verified: true,
//       isAvailable: true,
//     });
//     if (deliveryPerson) {
//       const currentOrder = await Order.findById(orderId);
//       if (currentOrder) {
//         // update deliveryId
//          currentOrder.deliveryId = String(deliveryPerson[0]._id);
//        const response = await currentOrder.save();
//       }
//     }
//   }
// };
// const validateTransaction = async (txnId: string) => {
//   const currentTransaction = await Transaction.findById(txnId);
//   if (currentTransaction) {
//     if (currentTransaction.status.toLocaleLowerCase() !== "failed") {
//       return { status: true, currentTransaction };
//     }
//   }
//   return { status: false, currentTransaction };
// };
// export const CreateOrder = async (
//   req: Request,res: Response,
//   next: NextFunction
// ) => {
//   const customer = req.user;
//   const { txnId, amount, items } = <OrderInputs>req.body;
//   if (customer) {
//     const { status, currentTransaction } = await validateTransaction(txnId);
//     if (!status) {
//       return res.status(404).json({ message: "Error with Create Order!" });
//     }
//     const profile = await Customer.findById(customer._id);
//     // create an order ID
//     const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
//     const cart = <[CartItem]>req.body;
//     let cartItems = Array();
//     let netAmount = 0.0;
//     let vandorId;
//     //Calculate order amount
//     const foods = await Food.find()
//       .where("_id")
//       .in(cart.map((item) => item._id))
//       .exec();
//     foods.map(food => {
//       items.map(({ _id, unit }) => {
//         if (food._id == _id) {
//           vandorId = food.vandorId;
//           netAmount += food.price * unit;
//           cartItems.push({ food, unit });
//         }
//       });
//     });
//     //create order with item descriptions
//     if (cartItems) {
//       // Create order
//       const currentOrder = await Order.create({
//         orderID: orderId,
//         vandorId: vandorId,
//         items: cartItems,
//         totalAmount: netAmount,
//         paidAmount: amount,
//         orderDate: new Date(),
//         orderStatus: "Waiting",
//         remarks: "",
//         deliveryId: "",
//         readyTime: 45,
//       });
//       if (currentOrder) {
//         profile.cart = [] as any;
//         currentTransaction.vandorId = vandorId;
//         currentTransaction.orderId = orderId;
//         currentTransaction.status = "CONFIRMED";
//         await currentTransaction.save();
//         assignOrderForDelivery(String(currentOrder._id), vandorId);
//         profile.orders.push(currentOrder);
//         await profile.save();
//         return res.status(200).json(currentOrder);
//       }
//     }
//   }
//   return res.status(400).json({ msg: "Error while Creating Order" });
// };
// export const GetOrders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const customer = req.user;
//   if (customer) {
//     const profile = await Customer.findById(customer._id).populate("orders");
//     if (profile) {
//       return res.status(200).json(profile.orders);
//     }
//   }
// };
// export const GetOrderById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const orderId = req.params.id;
//   if (orderId) {
//     const order = (await Order.findById(orderId)).populate("items.food");
//     res.status(200).json(order);
//   }
// };
// export const VerifyOffer = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const offerId = req.params.id;
//   const customer = req.user;
//   if (customer) {
//     const appliedOffer = await Offer.findById(offerId);
//     if (appliedOffer) {
//       if (appliedOffer.promoType === "USER") {
//       } else {
//         if (appliedOffer.isActive) {
//           return res
//             .status(200)
//             .json({ message: "Offer is valid", offer: appliedOffer });
//         }
//       }
//     }
//   }
//   return res.status(400).json({ message: "Offer is not valid" });
// };
//# sourceMappingURL=CustomerController.js.map