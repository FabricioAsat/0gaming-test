import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  getRandomNumber(limit: number = 100) {
    return Math.floor(Math.random() * limit);
  }
}
