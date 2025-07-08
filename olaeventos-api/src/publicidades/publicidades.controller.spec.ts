import { Test, TestingModule } from '@nestjs/testing';
import { PublicidadesController } from './publicidades.controller';

describe('PublicidadesController', () => {
  let controller: PublicidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicidadesController],
    }).compile();

    controller = module.get<PublicidadesController>(PublicidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
