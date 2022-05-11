import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    message: String
    age: Int
    price: Float
    isCustomer: Boolean
    color(colorId: ID): Color
    colors: [Color]
    book: Book
    books: [Book]
  }

  type Color {
    id: Int
    name: String
    hexcode: String
  }

  type Book {
    id: ID
    title: String
    isbn: String
    qty: Int
    price: Float
    author: Author
  }

  type Author {
    id: ID
    firstName: String
    lastName: String
    phoneNumber: String
  }
`;
