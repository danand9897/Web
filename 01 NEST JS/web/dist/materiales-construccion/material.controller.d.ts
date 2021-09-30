import { MaterialService } from './material.service';
export declare class MaterialController {
    private materialService;
    constructor(materialService: MaterialService);
    inicio(response: any): void;
    vistaCrear(response: any, qqueryParams: any): void;
    crearUsuario(response: any, bodyParams: any): Promise<void>;
    listaMateriales(response: any, parametrosConsulta: any): Promise<void>;
    elminarMaterial(response: any, routeParams: any): Promise<void>;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    actualizarMaterial(response: any, bodyParams: any, parametrosRuta: any): Promise<any>;
    obtenerUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__MaterialConstruccionClient<import(".prisma/client").MaterialConstruccion>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").MaterialConstruccion>;
    actualizarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__MaterialConstruccionClient<import(".prisma/client").MaterialConstruccion>;
    borrarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__MaterialConstruccionClient<import(".prisma/client").MaterialConstruccion>;
}
