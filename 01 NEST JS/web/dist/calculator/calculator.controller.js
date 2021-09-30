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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorController = void 0;
const common_1 = require("@nestjs/common");
let CalculatorController = class CalculatorController {
    add(queryParameters, req, res) {
        const cookieAux = req.cookie;
        const username = queryParameters.username;
        let cookieValue = cookieAux[username];
        if (!username || cookieAux[username] == undefined) {
            return "The username is not valid. Please make sure you enter the username correctly";
        }
        const result = parseInt(queryParameters.firstNumber) + parseInt(queryParameters.secondNumber);
        cookieValue -= result;
        if (cookieValue < 0) {
            return 'Congratulation!! You won the game';
        }
        else {
            return 'The result of the sum is: ' + result + '===> Points left to finish: ' + cookieValue;
        }
    }
    setUsername(pathParameters, req, res) {
        res.cookie(pathParameters.username, 100);
        res.cookie('username', pathParameters.username);
        return 'cookie name set: ' + pathParameters.username;
    }
};
__decorate([
    common_1.Get('add'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculatorController.prototype, "add", null);
__decorate([
    common_1.Get('setUsername/:username'),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculatorController.prototype, "setUsername", null);
CalculatorController = __decorate([
    common_1.Controller('calculator')
], CalculatorController);
exports.CalculatorController = CalculatorController;
//# sourceMappingURL=calculator.controller.js.map