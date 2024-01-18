import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(email: string, password: string): Promise<string> {
    const existsUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existsUser) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(password, existsUser.password);

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
}
