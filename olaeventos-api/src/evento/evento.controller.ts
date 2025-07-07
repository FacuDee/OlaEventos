import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  crear(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.crearEvento(createEventoDto);
  }

  @Get()
  obtenerTodos() {
    return this.eventoService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.obtenerPorId(id);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.eliminarEvento(id);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateEventoDto,
  ) {
    return this.eventoService.actualizarEvento(id, updateDto);
  }
}
