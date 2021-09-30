import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class MaterialService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__MaterialConstruccionClient<import(".prisma/client").MaterialConstruccion>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").MaterialConstruccion[]>;
    crearUno(material: Prisma.MaterialConstruccionCreateInput): Prisma.Prisma__MaterialConstruccionClient<import(".prisma/client").MaterialConstruccion>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.MaterialConstruccionUpdateInput;
    }): Prisma.Prisma__MaterialConstruccionClient<import(".prisma/client").MaterialConstruccion>;
    eliminarUno(id: number): Prisma.Prisma__MaterialConstruccionClient<import(".prisma/client").MaterialConstruccion>;
}
