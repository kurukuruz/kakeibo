import { InjectionKey, inject } from '@vue/composition-api';
import { BookStore } from './book';

export const BookStoreKey: InjectionKey<BookStore> = Symbol('BookStore');

export function typicalInjection<T> (key: InjectionKey<T>): T {
  const injected = inject(key);
  if (!injected) {
    throw new Error(key + ' is not provided.');
  }
  return injected;
}
