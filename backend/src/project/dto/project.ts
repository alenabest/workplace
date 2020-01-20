import { ApiPropertyOptional } from '@nestjs/swagger';


export class ProjectDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  user: number;
}
