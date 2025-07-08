import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  // Solo autenticados pueden crear
  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.crearEvento(createEventoDto);
  }

  // Pública: cualquiera puede ver todos los eventos
  @Get()
  obtenerTodos() {
    return this.eventoService.obtenerTodos();
  }

  // Pública: cualquiera puede ver un evento por id
  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.obtenerPorId(id);
  }

  // Solo autenticados pueden eliminar
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.eliminarEvento(id);
  }

  // Solo autenticados pueden actualizar
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateEventoDto,
  ) {
    return this.eventoService.actualizarEvento(id, updateDto);
  }
}