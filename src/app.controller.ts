import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  Headers,
  Put,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { query } from 'express';
import { ok } from 'assert';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('add')
  @HttpCode(200)
  addition(
    @Query()
    queryParameters,
    @Req()
    req,
    @Res({ passthrough: true })
    res,
  ) {
    if (req.signedCookies['total'] == undefined) {
      res.cookie('total', 100, {
        signed: true,
      });
      res.sendStatus(200);
      return 100;
    } else {
      if (req.signedCookies['total'] <= 0) {
        res.cookie('total', 100, {
          signed: true,
        });
        return 'Congratulation!! You won the game';
      } else {
        const cookieValue =
          Number(req.signedCookies['total']) -
          (Number(queryParameters.firstNumber) +
            Number(queryParameters.secondNumber));

        res.cookie('total', cookieValue, {
          signed: true,
        });

        return cookieValue;
      }
    }
  }

  @Post('sub')
  @HttpCode(201)
  sub(
    @Body()
    bodyParameters,
    @Res({ passthrough: true })
    res,
    @Req()
    req,
    @Headers()
    header,
  ) {
    if (req.signedCookies['total'] == undefined) {
      res.cookie('total', 100, {
        signed: true,
      });
      res.header('result', '100');
      return 100;
    } else {
      if (req.signedCookies['total'] <= 0) {
        res.cookie('total', 100, {
          signed: true,
        });
        return 'Congratulation!! You won the game';
      } else {
        const cookieValue =
          Number(req.signedCookies['total']) -
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

  @Put('mult/:firstNumber/:secondNumber')
  @HttpCode(201)
  mult(
    @Param()
    params,
    @Req()
    req,
    @Res({ passthrough: true })
    res,
  ) {
    if (req.signedCookies['total'] == undefined) {
      res.cookie('total', 100, {
        signed: true,
      });
      return 100;
    } else {
      if (req.signedCookies['total'] <= 0) {
        res.cookie('total', 100, {
          signed: true,
        });
        return 'Congratulation!! You won the game';
      } else {
        const cookieValue =
          Number(req.signedCookies['total']) -
          Number(params.firstNumber) * Number(params.secondNumber);

        res.cookie('total', cookieValue, {
          signed: true,
        });

        return cookieValue;
      }
    }
  }

  @Put('div/:firstNumber/:secondNumber')
  @HttpCode(201)
  div(
    @Param()
    params,
    @Req()
    req,
    @Res({ passthrough: true })
    res,
  ) {
    if (req.signedCookies['total'] == undefined) {
      res.cookie('total', 100, {
        signed: true,
      });
      return 100;
    } else {
      if (req.signedCookies['total'] <= 0) {
        res.cookie('total', 100, {
          signed: true,
        });
        return 'Congratulation!! You won the game';
      } else {
        const cookieValue =
          Number(req.signedCookies['total']) -
          Number(params.firstNumber) / Number(params.secondNumber);

        res.cookie('total', cookieValue, {
          signed: true,
        });

        return cookieValue;
      }
    }
  }

  @Get() //IMPLICITO HACIA LA RAIZ
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('texto')
  @HttpCode(200)
  helloText(): string {
    return 'Hola Texto';
  }

  @Get('html')
  @HttpCode(201)
  HelloHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }

  @Get('json')
  @HttpCode(200)
  helloJson(): string {
    return '{mensaje: "Hola JSON"}';
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //request - PETICION
    @Res() res, //response - RESPUESTA
  ) {
    //nombreComun            valor
    res.cookie('cookieInsegura', 'esto esta inseguro');
    //res.cookie('cookieSegura', 'esto esta seguro :)',{secure: true,});
    res.cookie('cookieSeguraYFirmada', 'esto esta seguro y firmado :)', {
      signed: true,
    });
    res.send('ok');
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje;
  }
}
