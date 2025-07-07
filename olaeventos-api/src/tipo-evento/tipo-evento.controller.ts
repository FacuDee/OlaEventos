import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TipoEventoService } from './tipo-evento.service';
import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';

@Controller('tipo-evento')
export class TipoEventoController {
  constructor(private readonly tipoEventoService: TipoEventoService) {}

  @Post()
  crear(@Body() dto: CreateTipoEventoDto) {
    return this.tipoEventoService.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.tipoEventoService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.tipoEventoService.obtenerPorId(id);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.tipoEventoService.eliminar(id);
  }
}
