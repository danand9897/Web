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
exports.MaterialController = void 0;
const common_1 = require("@nestjs/common");
const material_service_1 = require("./material.service");
const material_crear_dto_1 = require("./dto/material-crear.dto");
const class_validator_1 = require("class-validator");
const material_editar_dto_1 = require("./dto/material-editar.dto");
let MaterialController = class MaterialController {
    constructor(materialService) {
        this.materialService = materialService;
    }
    inicio(response) {
        response.render('inicio');
    }
    vistaCrear(response, qqueryParams) {
        response.render('material/crear-material', {
            datos: {
                mensaje: qqueryParams.mensaje,
            },
        });
    }
    async crearUsuario(response, bodyParams) {
        try {
            const materialRes = await this.materialService.crearUno({
                nombre: bodyParams.nombre,
                marca: bodyParams.marca,
                precio: +bodyParams.precio,
                tipo: bodyParams.tipo,
                stock: !!bodyParams.stock,
            });
            response.redirect('/material/vista-crear' +
                '?mensaje=Se creo el registro: ' +
                bodyParams.nombre);
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async listaMateriales(response, parametrosConsulta) {
        try {
            const respuesta = await this.materialService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log(respuesta);
            response.render('material/lista-material', {
                datos: {
                    material: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    async elminarMaterial(response, routeParams) {
        try {
            await this.materialService.eliminarUno(+routeParams.idMaterial);
            response.redirect('/material/lista-material' + '?mensaje=Se elimino el registro');
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const materialEditar = await this.materialService.buscarUno(+parametrosRuta.idMaterial);
            response.render('material/editar-material', {
                datos: {
                    material: materialEditar,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Editar');
        }
    }
    async actualizarMaterial(response, bodyParams, parametrosRuta) {
        const materialEditarDto = new material_editar_dto_1.MaterialEditarDto();
        materialEditarDto.nombre = bodyParams.nombre;
        materialEditarDto.marca = bodyParams.marca;
        materialEditarDto.precio = parseFloat(bodyParams.precio);
        materialEditarDto.tipo = bodyParams.tipo;
        materialEditarDto.stock = !!bodyParams.stock;
        console.log(materialEditarDto);
        console.log(parametrosRuta.idMaterial);
        console.log(bodyParams.idMaterial);
        try {
            const errores = await class_validator_1.validate(materialEditarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                return response.redirect('/material/lista-material/' + '?mensaje=Error validando datos');
            }
            else {
                await this.materialService.actualizarUno({
                    id: +parametrosRuta.idMaterial,
                    data: materialEditarDto,
                });
                response.redirect('/material/vista-crear' +
                    '?mensaje=Se editó el registro: ' +
                    bodyParams.nombre);
                console.log(parametrosRuta.idMaterial);
                console.log(bodyParams.idMaterial);
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    obtenerUno(parametroRuta) {
        return this.materialService.buscarUno(+parametroRuta.idMaterial);
    }
    async crearUno(parametrosCuerpo) {
        const materialCrearDTO = new material_crear_dto_1.MaterialCrearDto();
        materialCrearDTO.nombre = parametrosCuerpo.nombre;
        materialCrearDTO.marca = parametrosCuerpo.marca;
        materialCrearDTO.precio = parseFloat(parametrosCuerpo.precio);
        materialCrearDTO.tipo = parametrosCuerpo.tipo;
        console.log(parametrosCuerpo.stock.checked);
        if (parametrosCuerpo.stock == 'on') {
            materialCrearDTO.stock = true;
        }
        else {
            materialCrearDTO.stock = false;
        }
        materialCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const error = await class_validator_1.validate(materialCrearDTO);
            if (error.length > 0) {
                console.log(JSON.stringify(error));
                throw new common_1.BadRequestException('no envia bien parametros');
            }
            else {
                return this.materialService.crearUno(materialCrearDTO);
            }
        }
        catch (error) {
            console.error({
                error: error,
                mensaje: 'Errores en crear el material de construcción',
            });
            throw new common_1.InternalServerErrorException('error servidor');
        }
    }
    actualizarUno(parametroRuta) {
        return this.materialService.actualizarUno(parametroRuta.idMaterial);
    }
    borrarUno(parametroRuta) {
        return this.materialService.eliminarUno(parametroRuta.idMaterial);
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-material-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('lista-material'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "listaMateriales", null);
__decorate([
    common_1.Post('eliminar-material/:idMaterial'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "elminarMaterial", null);
__decorate([
    common_1.Post('vista-editar/:idMaterial'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "vistaEditar", null);
__decorate([
    common_1.Post('editar-material-formulario/:idMaterial'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "actualizarMaterial", null);
__decorate([
    common_1.Get(':idMaterial'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(':idMaterial'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "crearUno", null);
__decorate([
    common_1.Put(':idMaterial'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "actualizarUno", null);
__decorate([
    common_1.Delete(':idMaterial'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "borrarUno", null);
MaterialController = __decorate([
    common_1.Controller('material'),
    __metadata("design:paramtypes", [material_service_1.MaterialService])
], MaterialController);
exports.MaterialController = MaterialController;
//# sourceMappingURL=material.controller.js.map