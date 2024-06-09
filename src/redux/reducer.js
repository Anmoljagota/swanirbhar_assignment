import * as course from "./actionTypes";
const inital_state = {
  loading: false,
  error: false,
  courses: [],
  errormessage: "",
};
const reducer = (state=inital_state,{type,payload}) => {
switch(type){
    case course.GETCOURSE_LOADING:return {...state,loading:true};
    case course.GETCOURSE_SUCCESS:return {...state,courses:payload,loading:false}
    case course.GETCOURSE_ERROR:return {...state,error:true,loading:false,errormessage:payload}
    default:return state
}
};

export default reducer;
