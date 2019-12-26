import firebase from 'firebase/app';
import { Entry, Division, EntryDoc, Document } from './index';

export async function registerEntry (bookId: string, entry: Entry) {
  firebase.firestore()
    .collection('books').doc(bookId)
    .collection('entries').add(entry);
}

export async function getEntriesByDate (date: string): Promise<EntryDoc[]> {
  const data: Document<Entry> = {
    'hoge': { date: date, division: 'payout', categoryId: 'hoge', memo: 'CoCo壱番屋', amount: 860 },
    'foo': { date: date, division: 'payout', categoryId: 'foo', memo: 'manacaチャージ', amount: 5000 },
  };
  return Object.entries(data).map(e => {
    return { id: e[0], ...e[1] };
  });
}
