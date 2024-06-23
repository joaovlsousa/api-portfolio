import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: AuthDTO, @Res() res: Response) {
    try {
      const accessToken = await this.authService.login(body);

      return res.status(200).json({ accessToken }).send();
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
