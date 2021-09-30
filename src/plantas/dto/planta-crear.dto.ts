import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDecimal,
  IsBoolean,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class PlantaCrearDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nombreComun: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nombreCientifico: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  familia: string;

  @IsNotEmpty()
  @IsPositive()
  @IsDecimal()
  precio: number;

  @IsBoolean()
  @IsOptional()
  stock: boolean;

  @IsEmpty()
  fechaCreacion: string;
}
