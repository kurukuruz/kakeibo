export type Division = 'payout' | 'income';
export namespace Division {
  export const PAYOUT = 'payout';
  export const INCOME = 'income';
};

type Document = {
  id: string;
};

export type Book = {
  name: string;
  icon?: string;
};

export type BookDoc = Book & Document;

export type Category = {
  name: string;
  icon?: string;
  color: string;
  division: Division;
};

export type CategoryDoc = Category & Document;

export type Entry = {
  date: string;
  memo?: string;
  amount: number;
  categoryId: string;
  division: Division;
};

export type EntryDoc = Entry & Document;
