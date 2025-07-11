import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Injectable()
export class EventoService {
  constructor(private prisma: PrismaService) {}

  async crearEvento(data: CreateEventoDto) {
    try {
      const eventoCreado = await this.prisma.evento.create({
        data: {
          titulo: data.titulo,
          fecha: new Date(data.fecha),
          imagenUrl: data.imagenUrl,
          linkEntrada: data.linkEntrada,
          flyerUrl: data.flyerUrl,
          lugar: {
            connect: {
              id: Number(data.lugarId),
            },
          },
          tipoEvento: {
            connect: {
              id: Number(data.tipoEventoId),
            },
          },
        },
        include: {
          lugar: true,
          tipoEvento: true,
        },
      });

      return eventoCreado;
    } catch (error) {
      console.error('Error al crear evento:', error);
      throw error;
    }
  }

  async actualizarEvento(id: number, data: CreateEventoDto) {
    try {
      const eventoActualizado = await this.prisma.evento.update({
        where: { id },
        data: {
          titulo: data.titulo,
          fecha: new Date(data.fecha),
          imagenUrl: data.imagenUrl,
          linkEntrada: data.linkEntrada,
          flyerUrl: data.flyerUrl,
          lugar: { connect: { id: Number(data.lugarId) } },
          tipoEvento: { connect: { id: Number(data.tipoEventoId) } },
        },
        include: {
          lugar: true,
          tipoEvento: true,
        },
      });
      return eventoActualizado;
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      throw error;
    }
  }

  async obtenerTodos() {
    return this.prisma.evento.findMany({
      include: {
        tipoEvento: true,
        lugar: true,
      },
      orderBy: { fecha: 'asc' },
    });
  }

  async obtenerPorId(id: number) {
    return this.prisma.evento.findUnique({
      where: { id },
      include: {
        tipoEvento: true,
        lugar: true,
      },
    });
  }

  async eliminarEvento(id: number) {
    return this.prisma.evento.delete({
      where: { id },
    });
  }
}
