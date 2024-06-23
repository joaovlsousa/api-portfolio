import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule, AuthModule],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, AuthService],
})
export class ProjectModule {}
