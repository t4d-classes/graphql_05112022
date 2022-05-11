import fetch from 'node-fetch';

const authorCache = new Map();


export const resolvers = {
  Query: {
    message() {
      return 'Welcome to React and Apollo!';
    },
    age() {
      return 24;
    },
    price() {
      return 1.50;
    },
    isCustomer() {
      return true;
    },
    async color(_, args) {
      const res = await fetch('http://localhost:5050/colors/' + encodeURIComponent(args.colorId))
      const color = await res.json();
      return color;
    },
    async colors() {
      const res = await fetch('http://localhost:5050/colors')
      const color = await res.json();
      return color;
    },
    async book() {
      const res = await fetch('http://localhost:5050/books/2')
      const book = await res.json();
      return book;
    },
    async books() {
      const res = await fetch('http://localhost:5050/books')
      const books = await res.json();
      return books;
    }
  },
  Book: {
    // default resolver
    // isbn(book) {
    //   return book.isbn;
    // },
    async author(book) {

      if (!authorCache.has(book.authorId)) {
        console.log('fetching author: ', book.authorId);
        const res = await fetch(
          `http://localhost:5050/authors/${encodeURIComponent(book.authorId)}`);
        const author = await res.json();
        authorCache.set(book.authorId, author);
      }

      return authorCache.get(book.authorId);
    },
    qty(book) {
      return book.quantity;
    },
  }
};
