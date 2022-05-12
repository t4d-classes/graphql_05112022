import fetch from 'node-fetch';
import { PubSub } from 'graphql-subscriptions';

const vendors = [
  {
    id: 1,
    firstName: 'A',
    lastName: 'B',
    companyName: 'Acme',
    ein: '123123123',
  },
  {
    id: 2,
    firstName: 'C',
    lastName: 'D',
    companyName: 'Tooling Company',
    ein: '234234234',
  },
];

const employees = [
  {
    id: 1,
    firstName: 'A',
    lastName: 'B',
    ssn: '123123123',
  },
  {
    id: 2,
    firstName: 'C',
    lastName: 'D',
    ssn: '234234234',
  },
];  

const pubSub = new PubSub();

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
    },
    contacts() {
      return [ ...vendors, ...employees ];
    },
    people() {
      return [ ...vendors, ...employees ];
    }
  },
  Contact: {
    __resolveType: (obj) => {
      if (obj.ssn) {
        return 'Employee';
      }
      if (obj.ein) {
        return 'Vendor';
      }
      return null;
    },
  },
  People: {
    __resolveType: (obj) => {
      if (obj.ssn) {
        return 'Employee';
      }
      if (obj.ein) {
        return 'Vendor';
      }
      return null;
    },
  },  
  Employee: {
    id(contact) {
      return 'Employee:' + contact.id;
    }
  },
  Vendor: {
    id(contact) {
      return 'Vendor:' + contact.id;
    }
  },
  Mutation: {
    async appendColor(_, args, context) {

      const res = await fetch(`${context.restUrl}/colors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args.color),
      });

      const color = await res.json();

      pubSub.publish('COLOR_APPENDED', { colorAppended: color });

      return color;
    },
    async appendBook(_, args, context) {

      const authors = await fetch(
        `${context.restUrl}/authors?phoneNumber=${args.author.phoneNumber}`
      ).then(res => res.json());

      let authorId;

      if (authors.length === 1) {
        authorId = authors[0].id
      } else {
        const newAuthor = await fetch(`${context.restUrl}/authors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args.author),
        }).then(res => res.json());
        authorId = newAuthor.id;
      }

      return await fetch(`${context.restUrl}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...args.book,
          authorId,
        }),
      }).then(res => res.json());

    },
    async removeBook(_, args, context) {

      const book = await fetch(
        `${context.restUrl}/books/${args.bookId}`,
      ).then(res => res.json());

      await fetch(
        `${context.restUrl}/books/${args.bookId}`,
        { method: 'DELETE' },
      );

      const books = await fetch(
        `${context.restUrl}/books?authorId=${book.authorId}`,
      ).then(res => res.json());
      
      
      if (books.length === 0) {
        await fetch(
          `${context.restUrl}/authors/${book.authorId}`,
          { method: 'DELETE' },
        );        
      }

      return true;

    }
  },
  Subscription: {
    colorAppended: {
      subscribe: () => {
        return pubSub.asyncIterator(['COLOR_APPENDED']);
      }
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
  },
  Author: {
    fullName(author) {
      return author.firstName + ' ' + author.lastName;
    },
    async books(author, _, context) {
      let url = `${context.restUrl}/books`;
      url = `${url}?authorId=${encodeURIComponent(author.id)}`;

      const res = await fetch(url)
      const books = await res.json();
      return books;
    }
  }
};
