import { Body, Controller, Post, Req } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('/random')
export class RandomController {
  constructor(private randomService: RandomService) {}
  @Post()
  postRandomNumber(@Body() options: any, @Req() req: any) {
    return {
      data: { value: this.randomService.getRandomNumber(options.limit) },
      timestamp: req['timestamp'],
    };
  }
}
