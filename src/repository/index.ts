export enum Division {
  PAYOUT = 'payout',
  INCOME = 'income',
}

export type Book = {
  id?: string;
  name: string;
  icon?: string;
}

export type Category = {
  id?: string;
  name: string;
  icon?: string;
  color: string;
  division: Division;
};

export type Entry = {
  id?: string;
  date: string;
  memo?: string;
  amount: number;
  categoryId: string;
  division: Division;
};
