import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(
    // Inyectar dependencias
    private prisma: PrismaService,
  ) {}

  buscarMuchos(parametrosBusqueda: {
    skip?: number; // registros que te saltes 0 10 20
    take?: number; // registros tomas 10 10 10
    busqueda?: string; // Adr
    // orderBy?: Prisma.EPN_UsuarioOrder;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombreComun: { contains: parametrosBusqueda.busqueda } },
            { apellido: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    console.log(or);
    return this.prisma.ePN_USUARIO.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  buscarUno(id: number) {
    return this.prisma.ePN_USUARIO.findUnique({
      where: {
        id: id,
      },
    });
  }

  crearUno(usuario: Prisma.EPN_USUARIOCreateInput) {
    return this.prisma.ePN_USUARIO.create({
      data: usuario,
    });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.EPN_USUARIOUpdateInput;
  }) {
    return this.prisma.ePN_USUARIO.update({
      data: parametrosActualizar.data,
      where: {
        id: parametrosActualizar.id,
      },
    });
  }

  eliminarUno(id: number) {
    return this.prisma.ePN_USUARIO.delete({
      where: { id: id },
    });
  }
}
