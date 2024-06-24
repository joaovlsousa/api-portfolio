import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseService } from '../supabase/supabase.service';
import { UploadModule } from '../upload/upload.module';
import { UploadService } from '../upload/upload.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule, AuthModule, UploadModule, SupabaseModule],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    PrismaService,
    AuthService,
    UploadService,
    SupabaseService,
  ],
})
export class ProjectModule {}
