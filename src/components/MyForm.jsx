import React from "react";

export default function MyForm({
  handleSubmit,
  handleInput,
  formData,
  formErrors,
}) {
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
