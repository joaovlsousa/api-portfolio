import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from '../auth/auth.service';
import { ProjectDTO } from './project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly authService: AuthService,
  ) {}

  @Post('new')
  async createProject(
    @Body() body: ProjectDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.getCurrentUser(req['token']);

      const projectId = await this.projectService.createProject(body, user.id);

      return res.status(201).json({ projectId }).send();
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
