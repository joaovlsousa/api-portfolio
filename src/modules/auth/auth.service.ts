import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(credentials: AuthDTO): Promise<string> {
    const existsUser = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!existsUser) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      existsUser.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException();
    }

    let accessToken = existsUser.accessToken;

    if (!accessToken) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: existsUser.id,
        },
        data: {
          accessToken: uuid(),
        },
        select: {
          accessToken: true,
        },
      });

      accessToken = updatedUser.accessToken;
    }

    return accessToken;
  }

  async getCurrentUser(authorization: string | undefined) {
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const [type, accessToken] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new BadRequestException();
    }

    const user = await this.prisma.user.findUnique({
      where: { accessToken },
      select: {
        id: true,
        accessToken: true,
        email: true,
      },
    });

    if (!user || user.accessToken !== accessToken) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
