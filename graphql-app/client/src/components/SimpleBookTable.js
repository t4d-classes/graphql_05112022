export const SimpleBookTable = ({ books }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Author</th>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
      {books.map(book => <tr key={book.id}>
        <td>{book.id}</td>
        <td>{book.author.fullName}</td>
        <td>{book.title}</td>
        <td>{book.price}</td>
        <td>{book.quantity}</td>
      </tr>)}
      </tbody>
    </table>
  )
};