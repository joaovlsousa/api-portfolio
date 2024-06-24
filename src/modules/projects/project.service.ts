import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { FileDTO } from '../upload/upload.dto';
import { UploadService } from '../upload/upload.service';
import { ProjectDTO } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async createProject(file: FileDTO, projectData: ProjectDTO, userId: string) {
    const imageUrl = await this.uploadService.uploadFile(file);

    await this.prisma.project.create({
      data: {
        ...projectData,
        imageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
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
