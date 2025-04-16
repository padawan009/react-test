import React from 'react'
import './MyForm.css'

function MyForm() {
  return (
    <div className='my-form'>
        <form action="">
            <div>
                <h2>Welcome,</h2>
                <p>sing up to continue</p>   
            </div>

            <label htmlFor="firstName">
                Name:
            <input type="text" name="firstName" id="firstName" /> 
            </label>
            
            <label htmlFor="surname">
                Surname:
                <input type="text" name="surname" id="surname" />
            </label>

            <label htmlFor="email">
                E-mail:
                <input type="email" name="email" id="email"/>
            </label>

            <label htmlFor="password">
                Password:
                <input type="password" name="password" id="password"/>
            </label>

            <button type="submit">Sign Up</button>    
        </form>

    </div>
  )
}

export default MyForm