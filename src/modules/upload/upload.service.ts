import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { SupabaseService } from '../supabase/supabase.service';
import { FileDTO } from './upload.dto';

@Injectable()
export class UploadService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly projectService: ProjectService,
  ) {}

  async uploadFile(file: FileDTO, userId: string, projectId: string) {
    if (file.mimetype !== 'image/png') {
      throw new BadRequestException();
    }

    const supabase = this.supabaseService.createSupabaseClient();

    const { data, error } = await supabase.storage
      .from('projects')
      .upload(file.originalname, file.buffer, {
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) {
      throw new BadRequestException({ error });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('projects').getPublicUrl(data.path);

    await this.projectService.setImage(userId, projectId, publicUrl);
  }
}
