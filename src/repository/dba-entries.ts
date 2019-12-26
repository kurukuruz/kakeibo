import firebase from 'firebase/app';
import { Entry, Division, EntryDoc, Document } from './index';

export async function registerEntry (bookId: string, entry: Entry) {
  firebase.firestore()
    .collection('books').doc(bookId)
    .collection('entries').add(entry);
}

export async function getEntriesByDate (bookId: string, date: string): Promise<EntryDoc[]> {
  const snapshot = await firebase.firestore()
    .collection('books').doc(bookId)
    .collection('entries').where('date', '==', date)
    .get();

  const data: EntryDoc[] = snapshot.docs.map(doc => {
    return { id: doc.id, ...(doc.data() as Entry) };
  });

  return data;
}
