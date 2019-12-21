import { Category, Division, CategoryDoc } from './index';

export async function getAllCategories (): Promise<CategoryDoc[]> {
  // mock
  await setTimeout(() => { console.log('timeout'); }, 5000);
  const data: { [key: string]: Category } =
    {
      'hoge': { name: '食費', color: 'red', icon: 'mdi-silverware', division: 'payout' },
      'foo': { name: '交通費', color: 'lime darken-1', division: 'payout' },
      'bar': { name: '予算', color: 'black', division: 'income' },
    };
  return Object.entries(data).map(e => {
    return { id: e[0], ...e[1] };
  });
}
