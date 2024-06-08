import React, { useEffect, useState } from "react";
import User from "../components/User";
const Register = () => {
  const details = ["name", "email", "phone", "password"];
  const uservalue = { name: "", email: "", phone: "", password: "" };

  const [loginDetails, setLoginDetails] = useState(uservalue);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  //TO CHECK THE MAIL PATTERNN
  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!loginDetails.name) {
      setError("name");
      setFormError("write valid name");
    } else if (!validateEmailFormat(loginDetails.email)) {
      setError("email");
      setFormError("write valid email");
    } else if (loginDetails.password.length < 4) {
      setError("password");
      setFormError("must be atleast five characters");
    }
    //  else {
    //   dispatch(RegiterUser(loginDetails));
    // }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <User
        title={"Register"}
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

export default Register;
