import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LugarService } from './lugar.service';
import { CreateLugarDto } from './dto/create-lugar.dto';

@Controller('lugares')
export class LugarController {
  constructor(private readonly lugarService: LugarService) {}

  @Post()
  crear(@Body() dto: CreateLugarDto) {
    console.log('DTO recibido:', dto);
    return this.lugarService.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.lugarService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.lugarService.obtenerPorId(id);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.lugarService.eliminar(id);
  }
}
