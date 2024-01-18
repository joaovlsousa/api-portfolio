import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
} from '@nestjs/common';
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

      return { projectId };
    } catch (error) {
      return { error };
    }
  }

  @Get()
  async getProjects(
    @Headers('Authorization') authorization: string | undefined,
  ) {
    try {
      const user = await this.authService.getCurrentUser(authorization);

      const projects = await this.projectService.getProjects(user.id);

      return { projects };
    } catch (error) {
      return { error };
    }
  }
}
