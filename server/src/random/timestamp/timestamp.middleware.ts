import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TimestampMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const timestamp = new Date().toISOString();
    req['timestamp'] = timestamp;
    next();
  }
}
