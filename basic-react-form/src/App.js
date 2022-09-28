import React, {useState} from "react";
import "./index.css";

export default function App() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const firstNameChangeHandler = (event) =>{
    setValues({...values, firstName: event.target.value});
  }

  const lastNameChangeHandler = (event) =>{
    setValues({...values, lastName: event.target.value});
  }

  const emailChangeHandler = (event) =>{
    setValues({...values, email: event.target.value});
  }

  const [submit, setSubmit] = useState(false);
  const [valid, setValid] = useState(false);

  const formSubmitHandler = (event) =>{
    event.preventDefault();
    if(values.firstName && values.lastName && values.email){
      setValid(true);
    }else{
      setValid(false);
    }
    setSubmit(true);
  }

  return (
    <div class="form-container">
      <form class="register-form" onSubmit={formSubmitHandler}>
        { submit && valid ? <div class="success-message">Success! Thank you for registering</div> : null }
        <input
          id="first-name"
          class="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={values.firstName}
          // onChange={firstNameChangeHandler}
        />
        { submit && !values.firstName ? <span id="first-name-error">Please enter a first name</span> : null}
        <input
          id="last-name"
          class="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={lastNameChangeHandler}
        />
        { submit && !values.lastName ? <span id="last-name-error">Please enter a last name</span> : null }
        <input
          id="email"
          class="form-field"
          type="text"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={emailChangeHandler}
        />
        { submit && !values.email ? <span id="email-error">Please enter an email address</span> : null }
        <button class="form-field" type="submit">Register</button>
      </form>
    </div>
  );
}