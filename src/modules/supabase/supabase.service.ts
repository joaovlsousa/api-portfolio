import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  createSupabaseClient() {
    const client = createClient(
      process.env.SUPABASE_CLIENT_URL,
      process.env.SUPABASE_CLIENT_KEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    return client;
  }
}
