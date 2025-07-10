import { Controller, Get } from '@nestjs/common';

@Controller('publicidades')
export class PublicidadesController {
  @Get()
  findAll() {
    return [
      { id: 1, imagen: "/banners/banner1.png", link: "https://www.instagram.com/morellaproducciones/?hl=es-la" },
      { id: 2, imagen: "/banners/banner2.png", link: "https://www.olavarria.gov.ar/" },
      { id: 3, imagen: "/banners/banner3.png", link: "https://www.verte.tv/" }
    ];
  }
}

