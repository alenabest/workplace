import { ApiPropertyOptional } from '@nestjs/swagger';


export class TaskDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  project?: number;

  @ApiPropertyOptional()
  user: number;
}
