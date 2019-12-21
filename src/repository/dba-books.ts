import { Book, BookDoc, Document } from './index';

export async function getAllBooks (): Promise<BookDoc[]> {
  const data: Document<Book> = {
    'default': { name: '家計簿', icon: 'mdi-notebook' },
    'hoge': { name: 'オタク活動', icon: 'mdi-ticket' },
    'fuga': { name: '投資', icon: 'mdi-currency-usd' },
  };
  return Object.entries(data).map(e => {
    return { id: e[0], ...e[1] };
  });
}
