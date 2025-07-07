// create-evento.dto.ts
import { IsString, IsInt, IsUrl, IsDateString } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  titulo: string;

  @IsDateString()
  fecha: string;

  @IsUrl()
  imagenUrl: string;

  @IsUrl()
  linkEntrada: string;

  @IsInt()
  tipoEventoId: number;

  @IsInt()
  lugarId: number;
}
