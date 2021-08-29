import { Controller, Post, Body } from '@nestjs/common';
import { ApiConsumes, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDto, ForgetDto } from './login_dto';
@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiConsumes('application/json')
  @ApiOperation({ summary: '登录接口' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @ApiConsumes('application/json')
  @ApiOperation({ summary: '注册接口' })
  @Post('register')
  register(@Body() loginDto: LoginDto) {
    return this.loginService.register(loginDto);
  }

  @ApiConsumes('application/json')
  @ApiOperation({ summary: '修改密码接口' })
  @Post('reset')
  reset(@Body() forgetDto: ForgetDto) {
    return this.loginService.resetPassword(forgetDto);
  }
}
