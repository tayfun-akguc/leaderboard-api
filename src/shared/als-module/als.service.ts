import { ValueProvider } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export class AsyncStorage {
  userId: string | null;
  username: string | null;

  constructor() {
    this.userId = null;
    this.username = null;
  }
}

export const AsyncContext = new AsyncLocalStorage<AsyncStorage>();
export type Als = AsyncLocalStorage<AsyncStorage>;
export const ALS_TOKEN = Symbol('ALS_TOKEN');

export const AlsProvider: ValueProvider = {
  provide: ALS_TOKEN,
  useValue: AsyncContext,
};
