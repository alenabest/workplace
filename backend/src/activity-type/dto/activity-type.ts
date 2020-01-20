import { ApiPropertyOptional } from '@nestjs/swagger';

export class ActivityTypeDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  task: number;

  @ApiPropertyOptional()
  user: number;
}
