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
      const res = await fetch(
        'http://localhost:5050/colors/' + encodeURIComponent(args.colorId))
      const color = await res.json();
      return color;
    },
    async colors() {
      const res = await fetch('http://localhost:5050/colors')
      const color = await res.json();
      return color;
    },
    async book(_, args) {

      const bookId = parseInt(args?.bookId, 10);

      if (isNaN(bookId)) {
        throw new Error("book id is not a integer");
      }

      const res = await fetch(
        `http://localhost:5050/books/${encodeURIComponent(args.bookId)}`)
      const book = await res.json();
      return book;
    },
    async books(_, args, context) {

      let url = `${context.restUrl}/books`;

      if (args.authorId) {

        if (parseInt(context.req.header("Version")) < 2) {
          throw new Error("author id is only available on version 2 and later");
        }

        const authorId = parseInt(args.authorId, 10);
        if (isNaN(authorId)) {
          throw new Error("author id is not an integer");
        }
        url = `${url}?authorId=${encodeURIComponent(authorId)}`;
      }

      const res = await fetch(url)
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
