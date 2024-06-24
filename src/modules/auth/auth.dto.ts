import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty({ message: 'E-mail inválido' })
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Min. 6 caracteres' })
  password: string;
}
