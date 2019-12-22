import firebase from 'firebase/app';
import { Book, BookDoc, Document } from './index';

export async function getAllBooks (): Promise<BookDoc[]> {
  const snapshot = await firebase.firestore().collection('books').get();
  return snapshot.docs
    .map(doc => {
      return { id: doc.id, ...doc.data() } as BookDoc;
    })
    .sort((a, b) => a.order - b.order);
}
