import { useForm } from '../hooks/useForm';

export const BookForm = (props) => {

  const [bookForm, change, resetBookForm] = useForm({
    title: 'The Wandering Mind',
    isbn: '0987654321',
    category: "Inspirational",
    price: 10.99,
    quantity: 8,
    authorFirstName: 'Bob',
    authorLastName: 'Smith',
    authorPhoneNumber: '123-123-1234',
  });

  const submitBook = async () => {
    await props.onSubmitBook({ ...bookForm });

    resetBookForm();
  };

  return (
    <form>
      <label style={{ display: 'block' }}>
        Title:
        <input type="text" name="title"
          value={bookForm.title} onChange={change} />
      </label>
      <label style={{ display: 'block' }}>
        ISBN:
        <input type="text" name="isbn"
          value={bookForm.isbn} onChange={change} />
      </label>
      <label style={{ display: 'block' }}>
        Category:
        <input type="text" name="category"
          value={bookForm.category} onChange={change} />
      </label>
      <label style={{ display: 'block' }}>
        Price:
        <input type="number" name="price"
          value={bookForm.price} onChange={change} />
      </label>
      <label style={{ display: 'block' }}>
        Quantity:
        <input type="number" name="quantity"
          value={bookForm.quantity} onChange={change} />
      </label>

      <fieldset>
        <legend>New Author Information</legend>
        <label style={{ display: 'block' }}>
          First Name:
          <input type="text" name="authorFirstName"
            value={bookForm.authorFirstName} onChange={change} />
        </label>
        <label style={{ display: 'block' }}>
          Last Name:
          <input type="text" name="authorLastName"
            value={bookForm.authorLastName} onChange={change} />
        </label>
        <label style={{ display: 'block' }}>
          Phone Number:
          <input type="text" name="authorPhoneNumber"
            value={bookForm.authorPhoneNumber} onChange={change} />
        </label>
      </fieldset>

      <button type="button" onClick={submitBook}>
        {props.buttonText}</button>
    </form>
  );


};