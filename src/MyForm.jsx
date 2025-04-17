import React, { useState, useEffect } from "react";
import "./MyForm.css";

export default function MyForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  // const[isSubmit, setIsSubmit] = useState(false)

  function handleInput(e) {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setFormErrors(validateForm(updatedFormData));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validateForm(formData));
    // setIsSubmit(true);
  }

  // useEffect(() => {
  //     console.log(formErrors)
  //     if (Object.keys(formErrors).length === 0 && isSubmit) {
  //         console.log(formData);
  //     }
  // }, [formErrors, isSubmit, formData])

  function validateForm(values) {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexName = /^[A-Za-zА-Яа-яЁё\s-]+$/;

    if (!values.firstName) {
      errors.firstName = "Name is required!";
    } else if (!regexName.test(values.firstName)) {
      errors.firstName = "Only letters, spaces, and hyphens are allowed!";
    }
    if (!values.surname) {
      errors.surname = "Surname is required!";
    } else if (!regexName.test(values.surname)) {
      errors.surname = "Only letters, spaces, and hyphens are allowed!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not valid email!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password can't be more than 10 characters!";
    }
    return errors;
  }

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Welcome,</h2>
          <p>sign up to continue</p>
        </div>

        <label htmlFor="firstName">
          Name:
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInput}
          />
        </label>
        <p className="error-message">{formErrors.firstName}</p>

        <label htmlFor="surname">
          Surname:
          <input
            type="text"
            name="surname"
            id="surname"
            value={formData.surname}
            onChange={handleInput}
          />
        </label>
        <p className="error-message">{formErrors.surname}</p>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInput}
          />
        </label>
        <p className="error-message">{formErrors.email}</p>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInput}
          />
        </label>
        <p className="error-message">{formErrors.password}</p>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
