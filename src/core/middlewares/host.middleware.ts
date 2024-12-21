import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Solution } from 'src/domains/admin/v1/solutions/entities/solution.entity';

@Injectable()
export class HostMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const host = `${req.protocol}://${req.get('host')}`;
    Solution.setHost(host);
    next();
  }
}
