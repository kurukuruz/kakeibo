import { Category, Division, CategoryDoc, Document } from './index';

export async function getAllCategories (): Promise<Document<Category>> {
  return {
      'hoge': { name: '食費', color: 'red', icon: 'mdi-silverware', division: 'payout' },
      'foo': { name: '交通費', color: 'lime darken-1', division: 'payout' },
      'bar': { name: '予算', color: 'black', division: 'income' },
  };
}
