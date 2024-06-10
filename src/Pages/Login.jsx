import React, { useEffect, useState } from "react";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();

  const navigate = useNavigate();
  const details = ["email", "password"];
  const uservalue = { email: "", password: "" };

  const [loginDetails, setLoginDetails] = useState(uservalue);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const handleDetails = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };
  //TO CHECK THE MAIL PATTERN
  const validateEmailFormat = (email) => {
    email = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const CheckLogin = async () => {
    try {
      const data = await axios.get(
        `https://swanirbhar-backend.onrender.com/users?email=${loginDetails.email}&password=${loginDetails.password}`
      );

      navigate("/");
      if (data.data.length === 0) {
        console.log("running..");
        toast({
          title: "Invalid credentials.",
          description: "User authtication failed",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        localStorage.setItem("token", "rahul");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //submit the user details
  const handleSubmit = () => {
    if (!validateEmailFormat(loginDetails.email)) {
      setError("email");
      setFormError("write valid email");
    } else if (loginDetails.password.length < 4) {
      setError("password");
      setFormError("must be atleast five characters");
    } else {
      CheckLogin();
    }
  };

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
