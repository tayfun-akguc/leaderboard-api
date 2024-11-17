import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class TopListRequestDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ required: false, default: 1 })
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ required: false, default: 10 })
  limit: number = 10;
}
