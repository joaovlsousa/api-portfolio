import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { AuthService } from '../auth/auth.service';
import { FileDTO } from '../upload/upload.dto';
import { ProjectDTO } from './project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly authService: AuthService,
  ) {}

  @Post('new')
  @UseInterceptors(FileInterceptor('file'))
  async createProject(
    @UploadedFile() file: FileDTO,
    @Body('projectData') projectData: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const projectDTO = plainToInstance(ProjectDTO, JSON.parse(projectData));

      const errors = await validate(projectDTO);
      if (errors.length > 0) {
        throw new HttpException('Dados inválidos', 400);
      }

      const user = await this.authService.getCurrentUser(req['token']);

      await this.projectService.createProject(file, projectDTO, user.id);

      return res.status(201).send();
    } catch (error) {
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ message: error.message })
          .send();
      }
      return res
        .status(500)
        .json({ message: 'Erro interno do servidor', error })
        .send();
    }
  }

  @Get()
  async getProjects(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.authService.getCurrentUser(req['token']);
      const projects = await this.projectService.getAll(user.id);

      return res.status(200).json({ projects }).send();
    } catch (error) {
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ message: error.message })
          .send();
      }
      return res
        .status(500)
        .json({ message: 'Erro interno do servidor' })
        .send();
    }
  }

  @Get('pinned')
  async getPinnedProjects(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.authService.getCurrentUser(req['token']);
      const projects = await this.projectService.getPinned(user.id);

      return res.status(200).json({ projects }).send();
    } catch (error) {
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ message: error.message })
          .send();
      }
      return res
        .status(500)
        .json({ message: 'Erro interno do servidor' })
        .send();
    }
  }
}
