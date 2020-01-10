import { ApiProperty } from '@nestjs/swagger';


export class UserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthday: string;
}


export class UserFilterDto {
  @ApiProperty()
  username: string;
}
