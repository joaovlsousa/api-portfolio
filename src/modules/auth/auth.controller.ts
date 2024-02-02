import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthDTO } from './auth.dto';
import { authModel } from './auth.model';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: AuthDTO, @Res() res: Response) {
    try {
      const req = authModel.safeParse(body);

      if (!req.success) {
        throw new BadRequestException();
      }

      const accessToken = await this.authService.login(req.data);

      return res.status(200).json({ accessToken }).send();
    } catch (error) {
      return res
        .status(error.status ?? 500)
        .json({ message: error.response?.message })
        .send();
    }
  }
}
