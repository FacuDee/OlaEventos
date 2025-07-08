import { Module } from '@nestjs/common';
import { PublicidadesController } from './publicidades.controller';

@Module({
  controllers: [PublicidadesController]
})
export class PublicidadesModule {}
