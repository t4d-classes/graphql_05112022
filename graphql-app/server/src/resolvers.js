import fetch from 'node-fetch';

// {"operationName":"App","variables":{},"query":"query App {\n  message\n}"}

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
    async favoriteColor() {
      const res = await fetch('http://localhost:5050/colors/1')
      const color = await res.json();
      return color;
    },
    async colors() {
      const res = await fetch('http://localhost:5050/colors')
      const color = await res.json();
      return color;
    }
  }
};
