import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProjectDTO } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(projectData: ProjectDTO, userId: string) {
    const { id } = await this.prisma.project.create({
      data: {
        ...projectData,
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

  async getAll(userId: string) {
    const { projects } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            githubUrl: true,
            imageUrl: true,
            deployUrl: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return projects;
  }

  async getPinned(userId: string) {
    const { projects } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: {
          where: { pinned: true },
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            githubUrl: true,
            imageUrl: true,
            deployUrl: true,
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
