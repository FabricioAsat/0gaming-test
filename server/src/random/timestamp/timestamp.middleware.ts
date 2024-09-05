import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TimestampMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.body.limit < 0)
      throw new HttpException('Número no admitido', HttpStatus.BAD_REQUEST);

    const timestamp = new Date().toISOString();
    req['timestamp'] = timestamp;
    next();
  }
}
