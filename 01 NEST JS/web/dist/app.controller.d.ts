import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    addition(queryParameters: any, req: any, res: any): number | "Congratulation!! You won the game";
    sub(bodyParameters: any, res: any, req: any, header: any): number | "Congratulation!! You won the game";
    mult(params: any, req: any, res: any): number | "Congratulation!! You won the game";
    div(params: any, req: any, res: any): number | "Congratulation!! You won the game";
    getHello(): string;
    helloText(): string;
    HelloHTML(): string;
    helloJson(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
}
