import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthDto } from './auth.dto';
import { authModel } from './auth.model';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: AuthDto, @Res() res: Response) {
    try {
      const req = authModel.safeParse(body);

      if (!req.success) {
        throw new BadRequestException();
      }

      const { email, password } = req.data;

      const accessToken = await this.authService.login(email, password);

      return res.status(200).json({ accessToken }).send();
    } catch (error) {
      return { error };
    }
  }
}
