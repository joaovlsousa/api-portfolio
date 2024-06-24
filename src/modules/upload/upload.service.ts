import { BadRequestException, Injectable } from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import { FileDTO } from './upload.dto';

@Injectable()
export class UploadService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadFile(file: FileDTO) {
    if (file.mimetype !== 'image/png') {
      throw new BadRequestException('Tipo de imagem inválida');
    }
    const supabase = this.supabaseService.createSupabaseClient();

    const { data, error } = await supabase.storage
      .from('projects')
      .upload(file.originalname, file.buffer, {
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) {
      throw new BadRequestException({
        message: 'Erro ao salvar imagem',
        error,
      });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('projects').getPublicUrl(data.path);

    return publicUrl;
  }
}
