import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    message: String
    age: Int
    price: Float
    isCustomer: Boolean
    color(colorId: ID!): Color
    colors: [Color]
    book(bookId: ID!): Book
    books(authorId: ID): [Book]
  }

  type Mutation {
    appendColor(color: NewColor): Color
  }

  type Color {
    id: Int
    name: String
    hexcode: String
  }

  input NewColor {
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
    books: [Book]
    fullName: String
  }
`;
