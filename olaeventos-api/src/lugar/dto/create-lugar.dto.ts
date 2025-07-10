import { IsString, IsOptional } from 'class-validator';

export class CreateLugarDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsString()
  tipo: string;

  @IsString()
  @IsOptional()
  imagenUrl?: string;

  @IsString()
  @IsOptional()
  redSocial?: string;
}

