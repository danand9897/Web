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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    addition(queryParameters, req, res) {
        if (req.signedCookies['total'] == undefined) {
            res.cookie('total', 100, {
                signed: true,
            });
            res.sendStatus(200);
            return 100;
        }
        else {
            if (req.signedCookies['total'] <= 0) {
                res.cookie('total', 100, {
                    signed: true,
                });
                return 'Congratulation!! You won the game';
            }
            else {
                const cookieValue = Number(req.signedCookies['total']) -
                    (Number(queryParameters.firstNumber) +
                        Number(queryParameters.secondNumber));
                res.cookie('total', cookieValue, {
                    signed: true,
                });
                return cookieValue;
            }
        }
    }
    sub(bodyParameters, res, req, header) {
        if (req.signedCookies['total'] == undefined) {
            res.cookie('total', 100, {
                signed: true,
            });
            res.header('result', '100');
            return 100;
        }
        else {
            if (req.signedCookies['total'] <= 0) {
                res.cookie('total', 100, {
                    signed: true,
                });
                return 'Congratulation!! You won the game';
            }
            else {
                const cookieValue = Number(req.signedCookies['total']) -
                    (Number(bodyParameters.firstNumber) -
                        Number(bodyParameters.secondNumber));
                res.cookie('total', cookieValue, {
                    signed: true,
                });
                res.header('result', cookieValue.toString());
                return cookieValue;
            }
        }
    }
    mult(params, req, res) {
        if (req.signedCookies['total'] == undefined) {
            res.cookie('total', 100, {
                signed: true,
            });
            return 100;
        }
        else {
            if (req.signedCookies['total'] <= 0) {
                res.cookie('total', 100, {
                    signed: true,
                });
                return 'Congratulation!! You won the game';
            }
            else {
                const cookieValue = Number(req.signedCookies['total']) -
                    Number(params.firstNumber) * Number(params.secondNumber);
                res.cookie('total', cookieValue, {
                    signed: true,
                });
                return cookieValue;
            }
        }
    }
    div(params, req, res) {
        if (req.signedCookies['total'] == undefined) {
            res.cookie('total', 100, {
                signed: true,
            });
            return 100;
        }
        else {
            if (req.signedCookies['total'] <= 0) {
                res.cookie('total', 100, {
                    signed: true,
                });
                return 'Congratulation!! You won the game';
            }
            else {
                const cookieValue = Number(req.signedCookies['total']) -
                    Number(params.firstNumber) / Number(params.secondNumber);
                res.cookie('total', cookieValue, {
                    signed: true,
                });
                return cookieValue;
            }
        }
    }
    getHello() {
        return this.appService.getHello();
    }
    helloText() {
        return 'Hola Texto';
    }
    HelloHTML() {
        return '<h1>Hola HTML</h1> <button>Click</button>';
    }
    helloJson() {
        return '{mensaje: "Hola JSON"}';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('cookieInsegura', 'esto esta inseguro');
        res.cookie('cookieSeguraYFirmada', 'esto esta seguro y firmado :)', {
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
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
], AppController.prototype, "addition", null);
__decorate([
    common_1.Post('sub'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Req()),
    __param(3, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sub", null);
__decorate([
    common_1.Put('mult/:firstNumber/:secondNumber'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mult", null);
__decorate([
    common_1.Put('div/:firstNumber/:secondNumber'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "div", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('texto'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloText", null);
__decorate([
    common_1.Get('html'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "HelloHTML", null);
__decorate([
    common_1.Get('json'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloJson", null);
__decorate([
    common_1.Get('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    common_1.Get('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    common_1.Get('setear-cookie-insegura'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    common_1.Get('mostrar-cookies'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map