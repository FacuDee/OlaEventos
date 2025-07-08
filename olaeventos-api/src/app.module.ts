import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventoModule } from './evento/evento.module';
import { LugarModule } from './lugar/lugar.module';
import { TipoEventoModule } from './tipo-evento/tipo-evento.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, EventoModule, LugarModule, TipoEventoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
