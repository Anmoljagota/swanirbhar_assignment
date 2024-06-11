import * as User from "./actionTypes";
const initalstate = {
  loading: false,
  error: false,
  token: false,
  userData: [],
  message: "",
};
const reducer = (state = initalstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case User.USER_REGISTER_LOADING:
      return { ...state, loading: true };
    case User.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, message: payload };
    case User.USER_REGISTER_ERROR:
      return { ...state, error: true, loading: false };
    case User.POST_USERDETAILS_LOADING:
      return { ...state, loading: true };
    case User.POST_USERDETAILS_SUCCESS:
      return { ...state, token: true, loading: false, userData: payload };
    case User.POST_USERDETAILS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export { reducer };
