import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.usuario.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return { token };
  }

  async register(email: string, password: string, nombre: string) {
    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await this.prisma.usuario.create({
      data: { email, password: hash, nombre },
    });
    return { id: nuevoUsuario.id, email: nuevoUsuario.email };
  }
}
