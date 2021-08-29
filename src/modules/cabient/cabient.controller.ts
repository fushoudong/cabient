import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiConsumes, ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CabientService } from './cabient.service';
import { UpdateDto } from './cabient_dto';
@ApiTags('cabient')
@Controller('cabient')
export class CabientController {
  constructor(private readonly cabientService: CabientService) {}

  @ApiOperation({ summary: '获取全部格口列表' })
  @Get('getCabientList')
  getCabientList(@Query() query) {
    return this.cabientService.getCabientList(query);
  }

  @ApiOperation({ summary: '获取用户占用的格口列表' })
  @ApiQuery({ name: 'user', type: '', required: false })
  @Get('getCabientListByUser')
  getCabientListByUser(@Query() query) {
    return this.cabientService.getCabientList({ user: query.user });
  }

  @ApiConsumes('application/json')
  @ApiOperation({ summary: '开柜子 [10901大｜10902中｜10903小｜10904超小]' })
  @Post('openCabient')
  openCabient(@Body() updateDto: UpdateDto) {
    return this.cabientService.openCabient(updateDto);
  }
}
