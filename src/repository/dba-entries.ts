import firebase from 'firebase/app';
import { Entry, Division, EntryDoc, Document, WithTimestamp } from './index';

export async function registerEntry (bookId: string, entry: Entry) {
  const data: Entry & WithTimestamp = {
    ...entry,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  firebase.firestore()
    .collection('books').doc(bookId)
    .collection('entries').add(data);
}

export async function getEntriesByDate (bookId: string, date: string): Promise<EntryDoc[]> {
  const snapshot = await firebase.firestore()
    .collection('books').doc(bookId)
    .collection('entries').where('date', '==', date)
    .get();

  const data: EntryDoc[] = snapshot.docs.map(doc => {
    return { id: doc.id,
      ...(doc.data() as Entry),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    };
  });

  return data;
}

export async function getEntriesByYearMonth (bookId: string, yearMonth: string): Promise<Entry[]> {
  const snapshot = await firebase.firestore()
    .collection('books').doc(bookId)
    .collection('entries').where('date', '>', yearMonth + '-00').where('date', '<', yearMonth + '-32')
    .get();

  const data: Entry[] = snapshot.docs.map(doc => doc.data() as Entry);

  return data;
}
