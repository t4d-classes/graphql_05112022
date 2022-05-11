import { useForm } from '../hooks/useForm';

export const AuthorForm = (props) => {

  const [ authorForm, change, resetAuthorForm ] = useForm({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  
  const submitAuthor = async () => {
    await props.onSubmitAuthor({ ...authorForm });
    
    resetAuthorForm();
  };

  return (
    <form>
      <label style={{display: 'block'}}>
        First Name:
        <input type="text" name="firstName"
          value={authorForm.firstName} onChange={change} />
      </label>
      <label style={{display: 'block'}}>
        Last Name:
        <input type="text" name="lastName"
          value={authorForm.lastName} onChange={change} />
      </label>
      <label style={{display: 'block'}}>
        Phone Number:
        <input type="text" name="phoneNumber"
          value={authorForm.phoneNumber} onChange={change} />
      </label>
      <button type="button" onClick={submitAuthor}>
        {props.buttonText}</button>
    </form>
  );


};