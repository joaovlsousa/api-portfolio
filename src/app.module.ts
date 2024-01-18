import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UploadModule } from './modules/upload/upload.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    PrismaModule,
    UploadModule,
    SupabaseModule,
    ProjectModule,
  ],
})
export class AppModule {}
