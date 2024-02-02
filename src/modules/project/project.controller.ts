import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { ProjectDTO } from './project.dto';
import { projectModel } from './project.model';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createProject(
    @Headers('Authorization') authorization: string | undefined,
    @Body() body: ProjectDTO,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.getCurrentUser(authorization);
      const payload = projectModel.safeParse(body);

      if (!payload.success) {
        throw new BadRequestException();
      }

      const projectId = await this.projectService.createProject(
        payload.data,
        user.id,
      );

      return res.status(201).json({ projectId }).send();
    } catch (error) {
      return res
        .status(error.status ?? 500)
        .json({ message: error.response?.message })
        .send();
    }
  }

  @Get()
  async getProjects(
    @Headers('Authorization') authorization: string | undefined,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.getCurrentUser(authorization);

      const projects = await this.projectService.getProjects(user.id);

      return res.status(200).json({ projects }).send();
    } catch (error) {
      return res
        .status(error.status ?? 500)
        .json({ message: error.response?.message })
        .send();
    }
  }

  @Get('/pinned')
  async getPinnedProjects(
    @Headers('Authorization') authorization: string | undefined,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.getCurrentUser(authorization);

      const projects = await this.projectService.getPinnedProjects(user.id);

      return res.status(200).json({ projects }).send();
    } catch (error) {
      return res
        .status(error.status ?? 500)
        .json({ message: error.response?.message })
        .send();
    }
  }
}
