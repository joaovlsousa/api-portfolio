import {
  Controller,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { AuthService } from '../auth/auth.service';
import { FileDTO } from './upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly authService: AuthService,
  ) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: FileDTO,
    @Req() req: Request,
    @Param() projectId: { id: string },
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.getCurrentUser(req['token']);

      await this.uploadService.uploadFile(file, user.id, projectId.id);

      return res.status(201).send();
    } catch (error) {
      return res
        .status(error.status ?? 500)
        .json({ error })
        .send();
    }
  }
}
