import { Controller, Get } from '@nestjs/common';

@Controller('publicidades')
export class PublicidadesController {
  @Get()
  findAll() {
    return [
      { id: 1, imagen: "/banners/banner1.jpg", link: "https://ejemplo1.com" },
      { id: 2, imagen: "/banners/banner2.jpg", link: "https://ejemplo2.com" },
      { id: 3, imagen: "/banners/banner3.jpg", link: "https://ejemplo3.com" }
    ];
  }
}

