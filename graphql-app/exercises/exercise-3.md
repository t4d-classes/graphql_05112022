# Exercise 3

1. Update the GraphQL schema and resolvers to be able to run this query.

```graphql
query {
  books {
    title
    author {
      firstName
      lastName
      books {
        title
        author {
          fullName
        }
      }
    }
  }
}
```

The `Author`'s `fullName` field returns the `firstName` and `lastName` concatenated together.

2. Ensure it works!