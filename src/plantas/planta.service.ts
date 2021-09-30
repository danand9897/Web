import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlantaService {
  constructor(private prisma: PrismaService) {}
  buscarUno(id: number) {
    return this.prisma.planta.findUnique({ where: { id: id } });
  }
  buscarMuchos(parametrosBusqueda: {
    skip?: number; //Registros que te saltas
    take?: number; //Registros que tomas
    busqueda?: string; // Lo que el usuario busca
    // orderBy?: Prisma.EPN_UsuarioOrder;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombreComun: { contains: parametrosBusqueda.busqueda } },
            { nombreCientifico: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.planta.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }
  crearUno(planta: Prisma.PlantaCreateInput) {
    return this.prisma.planta.create({ data: planta });
  }
  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.PlantaUpdateInput;
  }) {
    return this.prisma.planta.update({
      data: parametrosActualizar.data,
      where: {
        id: +parametrosActualizar.id,
      },
    });
  }
  eliminarUno(id: number) {
    return this.prisma.planta.delete({
      where: { id: id },
    });
  }
}
