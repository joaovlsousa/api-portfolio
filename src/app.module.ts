import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtMiddleware } from './jwt.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProjectModule } from './modules/projects/project.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { UploadModule } from './modules/upload/upload.module';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'projects', method: RequestMethod.ALL },
        { path: 'projects/*', method: RequestMethod.ALL },
      );
  }
}
