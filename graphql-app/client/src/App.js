import { useQuery, gql } from "@apollo/client";

const APP_QUERY = gql`
  query App {
    message
  }
`;

function App() {

  // fetch("/graphql", {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json'},
  //   body: JSON.stringify({
  //     operationName: 'App',
  //     query: 'query App { message }',
  //     variables: {}
  //   })
  // })
  //   .then(res => res.json())
  //   .then(({ data }) => console.log(data.message));


  const { loading, error, data } = useQuery(APP_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>{data.message}</div>
  );
}

export default App;
