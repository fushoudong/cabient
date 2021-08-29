import { ApiProperty } from '@nestjs/swagger';
export class UpdateDto {
  @ApiProperty({
    required: true,
    description: 'id',
  })
  id: string;
}
