import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseService } from '../supabase/supabase.service';
import { UploadService } from './upload.service';

@Module({
  imports: [SupabaseModule, AuthModule],
  providers: [UploadService, SupabaseService],
})
export class UploadModule {}
