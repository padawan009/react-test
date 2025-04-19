import React, { useState } from "react";
import "./style/App.css";
import * as yup from "yup";
import MyForm from "./components/MyForm";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  function handleInput(e) {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      alert("The form has been successfully submitted");

      setFormData({
        firstName: "",
        surname: "",
        email: "",
        password: "",
      });
    } catch (err) {
      const errors = {};

      console.table(err);
      for (const { path, message } of err.inner) {
        errors[path] = message;
      }
      console.table(errors);
      setFormErrors(errors);
    }
  }

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("Name is required!")     
      .matches(
        /^[A-Za-zА-Яа-яЁё\s-]+$/,
        { message: "Only letters, spaces, and hyphens are allowed!", 
        excludeEmptyString: true }
      ),
    surname: yup
      .string()
      .required("Surname is required!")      
      .matches(
        /^[A-Za-zА-Яа-яЁё\s-]+$/,
        { message: "Only letters, spaces, and hyphens are allowed!", 
          excludeEmptyString: true }
        ),
    email: yup
      .string()
      .required("Email is required!")
      .email("This is not valid email!"),
    password: yup
      .string()
      .required("Password is required!")
      .test(
        "min-if-not-empty",
        "Password must be more than 4 characters!",
        function (value) {
          if (!value) return true;
          return value.length >= 5;
        }
      )
      .max(10, "Password can't be more than 10 characters!"),      
  });

  return (
    <>
      {
        <MyForm
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          formData={formData}
          formErrors={formErrors}
        />
      }
    </>
  );
}
