export const BookTableAction = ({ books, onDeleteBook }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      {books.map(book => <tr key={book.id}>
        <td>{book.title}</td>
        <td>{book.price}</td>
        <td><button type="button" onClick={() => onDeleteBook(book.id)}>
          Delete</button></td>
      </tr>)}
    </table>
  )
};