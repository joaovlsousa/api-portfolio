import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectDTO } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(projectData: ProjectDTO, userId: string) {
    const { deployUrl, description, githubUrl, pinned, title } = projectData;

    const appUrl = deployUrl === '$undefined' ? null : deployUrl;

    const { id } = await this.prisma.project.create({
      data: {
        description,
        githubUrl,
        pinned,
        title,
        deployUrl: appUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return id;
  }

  async setImage(userId: string, projectId: string, imageUrl: string) {
    await this.prisma.project.update({
      where: {
        id: projectId,
        userId,
      },
      data: {
        imageUrl,
      },
    });
  }

  async getProjects(userId: string) {
    const { projects } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: {
          select: {
            id: true,
            deployUrl: true,
            description: true,
            githubUrl: true,
            imageUrl: true,
            pinned: true,
            title: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return projects;
  }

  async getPinnedProjects(userId: string) {
    const { projects } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: {
          where: { pinned: true },
          select: {
            id: true,
            deployUrl: true,
            description: true,
            githubUrl: true,
            imageUrl: true,
            pinned: true,
            title: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return projects;
  }
}
