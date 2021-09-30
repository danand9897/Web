import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PlantaService } from './planta.service';
import { PlantaController } from './planta.controller';

@Module({
  imports: [
    // modulos importados
  ],
  providers: [
    // declaramos servicio
    PlantaService,
    PrismaService,
  ],
  exports: [
    // exportamos servicio
    PlantaService,
  ],
  controllers: [
    // declaramos controladores
    PlantaController,
  ],
})
export class PlantaModule {}
