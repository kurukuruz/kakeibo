import { Book } from './index';

export async function getAllBooks (): Promise<Book[]> {
  // mock
  return [
    { id: 'default', name: '家計簿', icon: 'mdi-notebook' },
    { id: 'hoge', name: 'オタク活動', icon: 'mdi-ticket' },
    { id: 'hoge', name: '投資', icon: 'mdi-currency-usd' },
  ];
}
