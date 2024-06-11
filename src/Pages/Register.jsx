import React, { useEffect, useState } from "react";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegiterUser } from "../redux/users/action";
const Register = () => {
  const dispatch = useDispatch();
  const {
    message,
    loading,
    error: usererror,
  } = useSelector((detail) => {
    return detail.user;
  });

  useEffect(() => {
    if (message === "user registered") {
      navigate("/");
    }
  }, [message]);
  const details = ["name", "email", "phone", "password"];
  const uservalue = { name: "", email: "", phone: "", password: "" };

  const [loginDetails, setLoginDetails] = useState(uservalue);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  //dispatching the RegisterUser to save user in db
  async function saveUser() {
    dispatch(RegiterUser(loginDetails));
  }

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
    } else {
      saveUser();
    }
  };

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
