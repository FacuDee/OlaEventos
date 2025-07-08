import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventoModule } from './evento/evento.module';
import { LugarModule } from './lugar/lugar.module';
import { TipoEventoModule } from './tipo-evento/tipo-evento.module';
import { AuthModule } from './auth/auth.module';
import { PublicidadesModule } from './publicidades/publicidades.module';

@Module({
  imports: [
    // 👉 Servir carpeta banners como estática desde /banners
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'banners'),
      serveRoot: '/banners',
    }),
    PrismaModule,
    EventoModule,
    LugarModule,
    TipoEventoModule,
    AuthModule,
    PublicidadesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
