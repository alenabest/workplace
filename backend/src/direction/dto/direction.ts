import { ApiPropertyOptional } from '@nestjs/swagger';


export class DirectionDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  project?: number;

  @ApiPropertyOptional()
  user: number;
}
