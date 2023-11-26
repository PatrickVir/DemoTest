// database.ts

export type User = {
  id: number;
  email: string;
  name: string;
  address: string;
};

export type Author = {
  id: number;
  name: string;
  books: Book[]; // Assuming Book type is also exported
};

export type Book = {
  id: number;
  title: string;
  author: Author;
  authorId: number;
};
