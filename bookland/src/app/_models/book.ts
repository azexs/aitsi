export interface IBook {
  book_id: number;
  language: ILanguage;
  publisher: IPublisher;
  category: ICategory;
  num_pages: number;
  title: string;
  description: string;
  isbn13: string;
  publication_date: Date;
  avg: number;
}

export interface IBookDetails {
  userRating: number | null
  allRating: number | null
  book: IBook;
}

export interface IComment {
  author: string;
  comment: string;
  title: string;
}


export interface IBookPage {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  books: Array<IBook>;
}

export interface ILanguage {
  language_name: string;
  language_code: string;
  language_id: number;
}

export interface IPublisher {
  id: number;
  publisher_name: string;
}

export interface ICategory {
  categoryId: number;
  name: string;
}
