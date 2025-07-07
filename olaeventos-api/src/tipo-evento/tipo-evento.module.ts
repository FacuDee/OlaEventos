import { Module } from '@nestjs/common';
import { TipoEventoService } from './tipo-evento.service';
import { TipoEventoController } from './tipo-evento.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TipoEventoController],
  providers: [TipoEventoService],
})
export class TipoEventoModule {}
