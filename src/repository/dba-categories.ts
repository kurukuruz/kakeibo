import firebase from 'firebase/app';
import { Category, Division, CategoryDoc, Document } from './index';

export async function getAllCategories (bookId: string): Promise<Document<Category>> {
  const snapshot = await firebase.firestore()
    .collection('books').doc(bookId)
    .collection('categories').get();

  const result: Document<Category> = {};
  snapshot.docs.forEach(doc => {
    result[doc.id] = doc.data() as Category;
  });

  return result;
}
