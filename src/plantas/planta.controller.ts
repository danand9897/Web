import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { PlantaService } from './planta.service';
import { PlantaCrearDto } from './dto/planta-crear.dto';
import { validate } from 'class-validator';
import { PlantaEditarDto } from './dto/planta-editar.dto';

// hpttp://localhost:3000/usuario/
@Controller('planta')
export class PlantaController {
  constructor(private plantaService: PlantaService) {}

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() queryParams) {
    response.render('planta/crear-planta', {
      datos: {
        mensaje: queryParams.mensaje,
      },
    });
  }

  @Post('crear-planta-formulario')
  async crearUsuario(@Res() response, @Body() bodyParams) {
    try {
      const plantaRes = await this.plantaService.crearUno({
        nombreComun: bodyParams.nombreComun,
        nombreCientifico: bodyParams.nombreCientifico,
        familia: bodyParams.familia,
        precio: +bodyParams.precio,
        stock: !!bodyParams.stock,
      });

      response.redirect(
        '/planta/vista-crear' +
          '?mensaje=Se creo el registro: ' +
          bodyParams.nombreComun,
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get('lista-planta')
  async listaPlanta(@Res() response, @Query() parametrosConsulta) {
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
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Post('eliminar-planta/:idPlanta')
  async elminarPlanta(@Res() response, @Param() routeParams) {
    try {
      await this.plantaService.eliminarUno(+routeParams.idPlanta);
      response.redirect(
        '/planta/lista-planta' + '?mensaje=Se elimino el registro',
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Post('vista-editar/:idPlanta')
  async vistaEditar(@Res() response, @Param() parametrosRuta) {
    try {
      const plantaEditar = await this.plantaService.buscarUno(
        +parametrosRuta.idPlanta,
      );
      response.render('planta/editar-planta', {
        datos: {
          planta: plantaEditar,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Editar');
    }
  }

  @Post('editar-planta-formulario/:idPlanta')
  async actualizarPlanta(
    @Res() response,
    @Body() bodyParams,
    @Param() parametrosRuta,
  ) {
    const plantaEditarDto = new PlantaEditarDto();
    plantaEditarDto.nombreComun = bodyParams.nombreComun;
    plantaEditarDto.nombreCientifico = bodyParams.nombreCientifico;
    plantaEditarDto.precio = parseFloat(bodyParams.precio);
    plantaEditarDto.familia = bodyParams.familia;
    plantaEditarDto.stock = !!bodyParams.stock;
    console.log(plantaEditarDto);
    console.log(parametrosRuta.idPlanta);
    console.log(bodyParams.idPlanta);
    try {
      const errores = await validate(plantaEditarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        return response.redirect(
          '/planta/lista-planta/' + '?mensaje=Error validando datos',
        );
      } else {
        await this.plantaService.actualizarUno({
          id: +parametrosRuta.idPlanta,
          data: plantaEditarDto,
        });
        response.redirect(
          '/planta/vista-crear' +
            '?mensaje=Se editó el registro: ' +
            bodyParams.nombreComun,
        );
        console.log(parametrosRuta.idPlanta);
        console.log(bodyParams.idPlanta);
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get(':idPlanta')
  obtenerUno(@Param() parametroRuta) {
    return this.plantaService.buscarUno(+parametroRuta.idPlanta);
  }

  @Post(':idPlanta')
  async crearUno(@Body() parametrosCuerpo) {
    const plantaCrearDTO = new PlantaCrearDto();
    plantaCrearDTO.nombreComun = parametrosCuerpo.nombreComun;
    plantaCrearDTO.nombreCientifico = parametrosCuerpo.nombreCientifico;
    plantaCrearDTO.precio = parseFloat(parametrosCuerpo.precio);
    plantaCrearDTO.familia = parametrosCuerpo.familia;
    console.log(parametrosCuerpo.stock.checked);
    if (parametrosCuerpo.stock == 'on') {
      plantaCrearDTO.stock = true;
    } else {
      plantaCrearDTO.stock = false;
    }

    plantaCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
    try {
      const error = await validate(plantaCrearDTO);
      if (error.length > 0) {
        console.log(JSON.stringify(error));
        throw new BadRequestException('no envia bien parametros');
      } else {
        return this.plantaService.crearUno(plantaCrearDTO);
      }
    } catch (error) {
      console.error({
        error: error,
        mensaje: 'Errores en crear el planta de construcción',
      });
      throw new InternalServerErrorException('error servidor');
    }
  }

  @Put(':idPlanta')
  actualizarUno(@Param() parametroRuta) {
    //se utiliza los parametros de cuerpo y de ruta
    return this.plantaService.actualizarUno(parametroRuta.idPlanta);
  }

  @Delete(':idPlanta')
  borrarUno(@Param() parametroRuta) {
    //se utiliza los parametros de ruta
    return this.plantaService.eliminarUno(parametroRuta.idPlanta);
  }
}
