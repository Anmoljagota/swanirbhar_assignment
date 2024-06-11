import * as User from "./actionTypes";
import axios from "axios";
const RegiterUser = (regsiterDetails) => async (dispatch) => {
  try {
    dispatch({ type: User.USER_REGISTER_LOADING });
    await fetch("https://swanirbhar-backend.onrender.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(regsiterDetails),
    });
    localStorage.setItem("token", regsiterDetails.name);
    dispatch({ type: User.USER_REGISTER_SUCCESS, payload: "user registered" });
  } catch (err) {
    dispatch({
      type: User.USER_REGISTER_ERROR,
      payload: "error while registration",
    });
    console.log(err);
  }
};

//LOGIN LOGIC
const LoginUser = (logindetails) => async (dispatch) => {
  try {
    dispatch({ type: User.POST_USERDETAILS_LOADING });
    const res = await axios.get(
      `https://swanirbhar-backend.onrender.com/users?email=${logindetails.email}&password=${logindetails.password}`
    );

    dispatch({
      type: User.POST_USERDETAILS_SUCCESS,
      payload: res.data,
    });
    return res;
  } catch (err) {
    dispatch({ type: User.POST_USERDETAILS_ERROR });
    console.log(err);
  }
};

// const UserDetails = () => async (dispatch) => {
//   try {
//     dispatch({ type: User.GET_USERDETAILS_LOADING });
//     const data = await axios.get(`http://localhost:8080/details`, {
//       withCredentials: true,
//     });
//     console.log(data, "data...");
//     dispatch({ type: User.GET_USERDETAILS_SUCCESS, payload: data.data });
//   } catch (err) {
//     console.log(err, "err");
//     dispatch({ type: User.GET_USERDETAILS_ERROR });
//   }
// };

export { RegiterUser, LoginUser };
