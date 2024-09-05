import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RandomController } from './random.controller';
import { RandomService } from './random.service';
import { TimestampMiddleware } from './timestamp/timestamp.middleware';

@Module({
  controllers: [RandomController],
  providers: [RandomService],
})
export class RandomModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimestampMiddleware)
      .forRoutes({ path: '/random', method: RequestMethod.POST });
  }
}

