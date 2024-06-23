import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectModule } from '../projects/project.module';
import { ProjectService } from '../projects/project.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseService } from '../supabase/supabase.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [SupabaseModule, AuthModule, PrismaModule, ProjectModule],
  controllers: [UploadController],
  providers: [
    UploadService,
    SupabaseService,
    AuthService,
    PrismaService,
    ProjectService,
  ],
})
export class UploadModule {}
