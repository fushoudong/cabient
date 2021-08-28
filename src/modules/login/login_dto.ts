import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    required: true,
    description: '用户名',
  })
  account: string;

  @ApiProperty({
    required: true,
    description: '密码',
  })
  password: string;
}

export class ForgetDto extends LoginDto {
  @ApiProperty({
    required: true,
    description: '新密码',
  })
  newPassword: string;
}
