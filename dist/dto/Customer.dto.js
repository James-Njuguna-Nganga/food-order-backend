"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryUserInput = exports.OrderInputs = exports.CartItem = exports.EditCustomerProfileInputs = exports.UserLoginInputs = exports.CreateCustomerInputs = void 0;
var class_validator_1 = require("class-validator");
var CreateCustomerInputs = /** @class */ (function () {
    function CreateCustomerInputs() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], CreateCustomerInputs.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.Length)(7, 12),
        __metadata("design:type", String)
    ], CreateCustomerInputs.prototype, "phone", void 0);
    __decorate([
        (0, class_validator_1.Length)(6, 12),
        __metadata("design:type", String)
    ], CreateCustomerInputs.prototype, "password", void 0);
    return CreateCustomerInputs;
}());
exports.CreateCustomerInputs = CreateCustomerInputs;
var UserLoginInputs = /** @class */ (function () {
    function UserLoginInputs() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], UserLoginInputs.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.Length)(6, 12),
        __metadata("design:type", String)
    ], UserLoginInputs.prototype, "password", void 0);
    return UserLoginInputs;
}());
exports.UserLoginInputs = UserLoginInputs;
var EditCustomerProfileInputs = /** @class */ (function () {
    function EditCustomerProfileInputs() {
    }
    __decorate([
        (0, class_validator_1.Length)(3, 16),
        __metadata("design:type", String)
    ], EditCustomerProfileInputs.prototype, "firstName", void 0);
    __decorate([
        (0, class_validator_1.Length)(3, 16),
        __metadata("design:type", String)
    ], EditCustomerProfileInputs.prototype, "lastName", void 0);
    __decorate([
        (0, class_validator_1.Length)(6, 16),
        __metadata("design:type", String)
    ], EditCustomerProfileInputs.prototype, "address", void 0);
    return EditCustomerProfileInputs;
}());
exports.EditCustomerProfileInputs = EditCustomerProfileInputs;
var CartItem = /** @class */ (function () {
    function CartItem() {
    }
    return CartItem;
}());
exports.CartItem = CartItem;
var OrderInputs = /** @class */ (function () {
    function OrderInputs() {
    }
    return OrderInputs;
}());
exports.OrderInputs = OrderInputs;
var CreateDeliveryUserInput = /** @class */ (function () {
    function CreateDeliveryUserInput() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], CreateDeliveryUserInput.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.Length)(7, 12),
        __metadata("design:type", String)
    ], CreateDeliveryUserInput.prototype, "phone", void 0);
    __decorate([
        (0, class_validator_1.Length)(6, 12),
        __metadata("design:type", String)
    ], CreateDeliveryUserInput.prototype, "password", void 0);
    __decorate([
        (0, class_validator_1.Length)(3, 12),
        __metadata("design:type", String)
    ], CreateDeliveryUserInput.prototype, "firstName", void 0);
    __decorate([
        (0, class_validator_1.Length)(3, 12),
        __metadata("design:type", String)
    ], CreateDeliveryUserInput.prototype, "lastName", void 0);
    __decorate([
        (0, class_validator_1.Length)(6, 24),
        __metadata("design:type", String)
    ], CreateDeliveryUserInput.prototype, "address", void 0);
    __decorate([
        (0, class_validator_1.Length)(4, 12),
        __metadata("design:type", String)
    ], CreateDeliveryUserInput.prototype, "pincode", void 0);
    return CreateDeliveryUserInput;
}());
exports.CreateDeliveryUserInput = CreateDeliveryUserInput;
//# sourceMappingURL=Customer.dto.js.map