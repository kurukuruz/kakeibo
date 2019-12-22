import firebase from 'firebase/app';
import { Book, BookDoc, Document } from './index';

export async function getAllBooks (): Promise<BookDoc[]> {
  const snapShot = await firebase.firestore().collection('books').get();
  return snapShot.docs
    .map(doc => {
      return { id: doc.id, ...doc.data() } as BookDoc;
    })
    .sort((a, b) => a.order - b.order);
}
