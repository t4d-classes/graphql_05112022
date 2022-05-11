import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message() {
      return 'Welcome to React and Apollo!';
    },
  }
};
