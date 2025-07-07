import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';

@Injectable()
export class TipoEventoService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CreateTipoEventoDto) {
    return this.prisma.tipoEvento.create({ data });
  }

  async obtenerTodos() {
    return this.prisma.tipoEvento.findMany({
      include: { eventos: true },
    });
  }

  async obtenerPorId(id: number) {
    return this.prisma.tipoEvento.findUnique({
      where: { id },
      include: { eventos: true },
    });
  }

  async eliminar(id: number) {
    return this.prisma.tipoEvento.delete({ where: { id } });
  }
}
