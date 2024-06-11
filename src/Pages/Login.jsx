import React, { useEffect, useState } from "react";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/users/action";

const Login = () => {
  const dispatch = useDispatch();
  const {
    token,
    userData,
    error: loginerror,
    loading,
  } = useSelector((data) => {
    return data.user;
  });
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

  useEffect(() => {
    if (token && userData.length > 0) {
      navigate("/");
      localStorage.setItem("token", userData[0].name);
    }
  }, [token, userData]);

  //TO CHECK whether can access the platform or not
  const CheckLogin = async () => {
    dispatch(LoginUser(loginDetails)).then((res) => {
      if (res.data.length === 0) {
        toast({
          title: "Invalid credentials.",
          description: "User authtication failed",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
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

  if (loading) {
    return <h3>...Loading</h3>;
  }
  if (loginerror) {
    return <h3>something went wrong we will reach out to you Later</h3>;
  }
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
