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
    contacts: [Contact]
    people: [People]
  }

  type Mutation {
    appendColor(color: NewColor): Color
    appendBook(book: NewBook!, author: AuthorInput!): Book
    removeBook(bookId: ID!): Boolean
  }

  type Subscription {
    colorAppended: Color
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

  input NewBook {
    title: String
    isbn: String
    quantity: Int
    price: Float
    authorId: ID
  }  

  type Author {
    id: ID
    firstName: String
    lastName: String
    phoneNumber: String
    books: [Book]
    fullName: String
  }

  input AuthorInput { 
    firstName: String
    lastName: String
    phoneNumber: String
  }

  interface Contact {
    id: ID
    firstName: String
    lastName: String
  }

  type Employee implements Contact {
    id: ID
    firstName: String
    lastName: String
    ssn: String
  }

  type Vendor implements Contact {
    id: ID
    firstName: String
    lastName: String
    ein: String
  }

  union People = Employee | Vendor
`;
