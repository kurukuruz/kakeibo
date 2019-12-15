import { Category, Division } from './index';

export async function getAllCategories (): Promise<Category[]> {
  // mock
  await setTimeout(() => { console.log('timeout'); }, 5000);
  return [
    { id: 'hoge', name: '食費', color: 'red', icon: 'mdi-silverware', division: Division.PAYOUT },
    { id: 'foo', name: '交通費', color: 'lime darken-1', division: Division.PAYOUT },
    { id: 'bar', name: '予算', color: 'black', division: Division.INCOME },
  ];
}
