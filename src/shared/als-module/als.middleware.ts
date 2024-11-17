import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { Als, ALS_TOKEN, AsyncStorage } from './als.service';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  constructor(@Inject(ALS_TOKEN) private readonly als: Als) {}

  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const store = new AsyncStorage();
    this.als.run(store, () => {
      next();
    });
  }
}
