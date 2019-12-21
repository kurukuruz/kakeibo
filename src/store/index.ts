import { InjectionKey, inject } from '@vue/composition-api';
import { BookStore } from './book';
import { CategoriesStore } from './categories';

export const BookStoreKey: InjectionKey<BookStore> = Symbol('BookStore');
export const CategoriesStoreKey: InjectionKey<CategoriesStore> = Symbol('CategoriesStore');

export function typicalInjection<T> (key: InjectionKey<T>): T {
  const injected = inject(key);
  if (!injected) {
    throw new Error(key + ' is not provided.');
  }
  return injected;
}
