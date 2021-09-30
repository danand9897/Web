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
exports.PlantaController = void 0;
const common_1 = require("@nestjs/common");
const planta_service_1 = require("./planta.service");
const planta_crear_dto_1 = require("./dto/planta-crear.dto");
const class_validator_1 = require("class-validator");
const planta_editar_dto_1 = require("./dto/planta-editar.dto");
let PlantaController = class PlantaController {
    constructor(plantaService) {
        this.plantaService = plantaService;
    }
    inicio(response) {
        response.render('inicio');
    }
    vistaCrear(response, queryParams) {
        response.render('planta/crear-planta', {
            datos: {
                mensaje: queryParams.mensaje,
            },
        });
    }
    async crearUsuario(response, bodyParams) {
        try {
            const plantaRes = await this.plantaService.crearUno({
                nombreComun: bodyParams.nombreComun,
                nombreCientifico: bodyParams.nombreCientifico,
                familia: bodyParams.familia,
                precio: +bodyParams.precio,
                stock: !!bodyParams.stock,
            });
            response.redirect('/planta/vista-crear' +
                '?mensaje=Se creo el registro: ' +
                bodyParams.nombreComun);
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async listaPlanta(response, parametrosConsulta) {
        try {
            const respuesta = await this.plantaService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log(respuesta);
            response.render('planta/lista-planta', {
                datos: {
                    planta: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    async elminarPlanta(response, routeParams) {
        try {
            await this.plantaService.eliminarUno(+routeParams.idPlanta);
            response.redirect('/planta/lista-planta' + '?mensaje=Se elimino el registro');
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const plantaEditar = await this.plantaService.buscarUno(+parametrosRuta.idPlanta);
            response.render('planta/editar-planta', {
                datos: {
                    planta: plantaEditar,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Editar');
        }
    }
    async actualizarPlanta(response, bodyParams, parametrosRuta) {
        const plantaEditarDto = new planta_editar_dto_1.PlantaEditarDto();
        plantaEditarDto.nombreComun = bodyParams.nombreComun;
        plantaEditarDto.nombreCientifico = bodyParams.nombreCientifico;
        plantaEditarDto.precio = parseFloat(bodyParams.precio);
        plantaEditarDto.familia = bodyParams.familia;
        plantaEditarDto.stock = !!bodyParams.stock;
        console.log(plantaEditarDto);
        console.log(parametrosRuta.idPlanta);
        console.log(bodyParams.idPlanta);
        try {
            const errores = await class_validator_1.validate(plantaEditarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                return response.redirect('/planta/lista-planta/' + '?mensaje=Error validando datos');
            }
            else {
                await this.plantaService.actualizarUno({
                    id: +parametrosRuta.idPlanta,
                    data: plantaEditarDto,
                });
                response.redirect('/planta/vista-crear' +
                    '?mensaje=Se editó el registro: ' +
                    bodyParams.nombreComun);
                console.log(parametrosRuta.idPlanta);
                console.log(bodyParams.idPlanta);
            }
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    obtenerUno(parametroRuta) {
        return this.plantaService.buscarUno(+parametroRuta.idPlanta);
    }
    async crearUno(parametrosCuerpo) {
        const plantaCrearDTO = new planta_crear_dto_1.PlantaCrearDto();
        plantaCrearDTO.nombreComun = parametrosCuerpo.nombreComun;
        plantaCrearDTO.nombreCientifico = parametrosCuerpo.nombreCientifico;
        plantaCrearDTO.precio = parseFloat(parametrosCuerpo.precio);
        plantaCrearDTO.familia = parametrosCuerpo.familia;
        console.log(parametrosCuerpo.stock.checked);
        if (parametrosCuerpo.stock == 'on') {
            plantaCrearDTO.stock = true;
        }
        else {
            plantaCrearDTO.stock = false;
        }
        plantaCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const error = await class_validator_1.validate(plantaCrearDTO);
            if (error.length > 0) {
                console.log(JSON.stringify(error));
                throw new common_1.BadRequestException('no envia bien parametros');
            }
            else {
                return this.plantaService.crearUno(plantaCrearDTO);
            }
        }
        catch (error) {
            console.error({
                error: error,
                mensaje: 'Errores en crear el planta de construcción',
            });
            throw new common_1.InternalServerErrorException('error servidor');
        }
    }
    actualizarUno(parametroRuta) {
        return this.plantaService.actualizarUno(parametroRuta.idPlanta);
    }
    borrarUno(parametroRuta) {
        return this.plantaService.eliminarUno(parametroRuta.idPlanta);
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlantaController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PlantaController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-planta-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlantaController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('lista-planta'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlantaController.prototype, "listaPlanta", null);
__decorate([
    common_1.Post('eliminar-planta/:idPlanta'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlantaController.prototype, "elminarPlanta", null);
__decorate([
    common_1.Post('vista-editar/:idPlanta'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlantaController.prototype, "vistaEditar", null);
__decorate([
    common_1.Post('editar-planta-formulario/:idPlanta'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PlantaController.prototype, "actualizarPlanta", null);
__decorate([
    common_1.Get(':idPlanta'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlantaController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(':idPlanta'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlantaController.prototype, "crearUno", null);
__decorate([
    common_1.Put(':idPlanta'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlantaController.prototype, "actualizarUno", null);
__decorate([
    common_1.Delete(':idPlanta'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlantaController.prototype, "borrarUno", null);
PlantaController = __decorate([
    common_1.Controller('planta'),
    __metadata("design:paramtypes", [planta_service_1.PlantaService])
], PlantaController);
exports.PlantaController = PlantaController;
//# sourceMappingURL=planta.controller.js.map