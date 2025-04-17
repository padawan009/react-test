import React, { useState, useEffect } from 'react'
import './MyForm.css'

function MyForm() {

    const[formData, setFormData] = useState({
        firstName: "",
        surname: "",
        email: "",
        password: "",
    });

    const[formErrors, setFormErrors] = useState({});
    const[isSubmit, setIsSubmit] = useState(false)

    function handleInput(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFormErrors(validateForm(formData));
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formData);
        }
    },[formErrors])

    function validateForm(values) {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.firstName) {
            errors.firstName = 'Name is required!';
        }
        if(!values.surname) {
            errors.surname = 'Surname is required!';
        }
        if(!values.email) {
            errors.email = 'Email is required!';
        }
        if(!values.password) {
            errors.password = 'Password is required!';
        }
        return errors;
    }

  return (
    <div className='my-form'>
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Welcome,</h2>
                <p>sing up to continue</p>   
            </div>

            <label htmlFor="firstName">
                Name:
            <input 
            type="text" 
            name="firstName" 
            id="firstName"
            value={formData.firstName}
            onChange={handleInput} /> 
            </label>
            <p>{formErrors.firstName}</p>

            <label htmlFor="surname">
                Surname:
                <input 
                type="text" 
                name="surname" 
                id="surname"
                value={formData.surname}
                onChange={handleInput} />
            </label>
            <p>{formErrors.surname}</p>

            <label htmlFor="email">
                E-mail:
                <input 
                type="email" 
                name="email" 
                id="email"
                value={formData.email}
                onChange={handleInput}/>
            </label>
            <p>{formErrors.email}</p>

            <label htmlFor="password">
                Password:
                <input 
                type="password" 
                name="password" 
                id="password"
                value={formData.password}
                onChange={handleInput}/>
            </label>
            <p>{formErrors.password}</p>

            <button type="button">Sign Up</button>    
        </form>

    </div>
  )
}

export default MyForm