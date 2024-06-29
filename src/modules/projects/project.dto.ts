import { $Enums as PrismaEnums } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';

export class ProjectDTO {
  @MinLength(3, { message: 'Titulo invalido' })
  title: string;

  @MinLength(10, { message: 'Descrição invalida' })
  description: string;

  @IsUrl({}, { message: 'Url inválida' })
  githubUrl: string;

  @IsUrl({}, { message: 'Url inválida' })
  @IsOptional()
  deployUrl: string | undefined;

  @IsOptional()
  pinned: boolean | undefined;

  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @IsEnum(PrismaEnums.ProjetcType, { message: 'Tipo inválido' })
  type: PrismaEnums.ProjetcType;
}
