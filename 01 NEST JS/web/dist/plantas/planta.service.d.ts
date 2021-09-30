import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class PlantaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__PlantaClient<import(".prisma/client").Planta>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Planta[]>;
    crearUno(planta: Prisma.PlantaCreateInput): Prisma.Prisma__PlantaClient<import(".prisma/client").Planta>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.PlantaUpdateInput;
    }): Prisma.Prisma__PlantaClient<import(".prisma/client").Planta>;
    eliminarUno(id: number): Prisma.Prisma__PlantaClient<import(".prisma/client").Planta>;
}
