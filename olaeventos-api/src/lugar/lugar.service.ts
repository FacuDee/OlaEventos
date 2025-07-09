import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLugarDto } from './dto/create-lugar.dto';

@Injectable()
export class LugarService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CreateLugarDto) {
    console.log('Datos recibidos para crear lugar:', data);
    return this.prisma.lugar.create({
      data: {
        nombre: data.nombre,
        direccion: data.direccion,
        tipo: data.tipo,
      },
    });
  }

  async obtenerTodos() {
    return this.prisma.lugar.findMany({
      include: { eventos: true },
    });
  }

  async obtenerPorId(id: number) {
    return this.prisma.lugar.findUnique({
      where: { id },
      include: { eventos: true },
    });
  }

  async eliminar(id: number) {
    return this.prisma.lugar.delete({ where: { id } });
  }
}
