import { ApiPropertyOptional } from '@nestjs/swagger';


export class UserDto {
  @ApiPropertyOptional()
  username: string;
  @ApiPropertyOptional()
  password: string;
}

export class PasswordDTO {
  @ApiPropertyOptional()
  newPassword: string;
  @ApiPropertyOptional()
  oldPassword: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  middleName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  mobile: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  birthday: string;
}


export class UserFilterDto {
  @ApiPropertyOptional()
  username: string;
}
