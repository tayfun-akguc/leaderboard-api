import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AlsProvider } from './als.service';
import { AlsMiddleware } from './als.middleware';

@Global()
@Module({
  providers: [AlsProvider],
  exports: [AlsProvider],
})
export class AlsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlsMiddleware).forRoutes('leaderboard/submit-score');
  }
}
