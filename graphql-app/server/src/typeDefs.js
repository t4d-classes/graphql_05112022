import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    message: String
    age: Int
    price: Float
    isCustomer: Boolean
    favoriteColor: Color
    colors: [Color]
  }

  type Color {
    id: Int
    name: String
    hexcode: String
  }
`;
