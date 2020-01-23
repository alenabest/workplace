import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class ActivityDayDto {
  @ApiProperty()
  user: number;

  @ApiProperty()
  activityDate: string;
}

export class ActivityWeekMonthDto {
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  endDate: string;
}

export class ActivityCreateUpdateDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;

  @ApiProperty()
  startHour: number;

  @ApiProperty()
  startMinute: number;

  @ApiProperty()
  endHour: number;

  @ApiProperty()
  endMinute: number;

  @ApiProperty()
  height: string;

  @ApiPropertyOptional()
  project: number;

  @ApiPropertyOptional()
  direction: number;

  @ApiPropertyOptional()
  type: number;
}
