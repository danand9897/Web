import { PlantaService } from './planta.service';
export declare class PlantaController {
    private plantaService;
    constructor(plantaService: PlantaService);
    inicio(response: any): void;
    vistaCrear(response: any, queryParams: any): void;
    crearUsuario(response: any, bodyParams: any): Promise<void>;
    listaPlanta(response: any, parametrosConsulta: any): Promise<void>;
    elminarPlanta(response: any, routeParams: any): Promise<void>;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    actualizarPlanta(response: any, bodyParams: any, parametrosRuta: any): Promise<any>;
    obtenerUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__PlantaClient<import(".prisma/client").Planta>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").Planta>;
    actualizarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__PlantaClient<import(".prisma/client").Planta>;
    borrarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__PlantaClient<import(".prisma/client").Planta>;
}
