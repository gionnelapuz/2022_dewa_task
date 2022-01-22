import React, { useState } from "react";

import Logo from "../../../resources/assets/logo.png";
import Input from "../../includes/Input";

import "./login.scss";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!validateForm()) {
      setIsLoading(true);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (email.length <= 0) {
      errors.email = true;
    }

    if (password.length <= 0) {
      errors.password = true;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return true;
    }

    return false;
  };

  const resetStates = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <img alt="logo" src={Logo} />

        <form className="row g-3" onSubmit={handleFormSubmit}>
          <Input
            className="form-group col-12"
            name="email"
            value={email}
            label="Email"
            type="email"
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            className="form-group col-12"
            name="password"
            value={password}
            label="Password"
            type="password"
            onChange={handleInputChange}
            error={errors.password}
          />
          <button type="submit" className="btn btn-sm btn--green col-12" disabled={isLoading}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
