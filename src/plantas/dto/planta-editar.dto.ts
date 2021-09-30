import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDecimal,
  IsInt,
} from 'class-validator';

export class PlantaEditarDto {
  nombreComun: string;

  nombreCientifico: string;

  familia: string;

  precio: number;

  stock: boolean;
}
