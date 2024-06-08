import React, { useEffect, useState } from "react";
import User from "../components/User";

const Login = () => {
  const details = ["email", "password"];
  const uservalue = { email: "", password: "" };

  const [loginDetails, setLoginDetails] = useState(uservalue);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };
  console.log(loginDetails,"logi");
  //TO CHECK THE MAIL PATTERNN
  const validateEmailFormat = (email) => {
    email = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = () => {
    if (!validateEmailFormat(loginDetails.email)) {
      setError("email");
      setFormError("write valid email");
    } else if (loginDetails.password.length < 4) {
      setError("password");
      setFormError("must be atleast five characters");
    }
    // else {
    //   dispatch(LoginUser(loginDetails));
    // }
  };
  useEffect(() => {
    // if (message.message === "logged in successfully") {
    //   navigate("/");
    // }
  }, []);
  return (
    <div>
      <User
        title={"Login"}
        details={details}
        uservalue={loginDetails}
        handleDetails={handleDetails}
        handleSubmit={handleSubmit}
        error={error}
        formError={formError}
      />
    </div>
  );
};

export default Login;
