import { ApiPropertyOptional } from '@nestjs/swagger';

export class ActivityTypeDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  direction: number;

  @ApiPropertyOptional()
  user: number;
}
