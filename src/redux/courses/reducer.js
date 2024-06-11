import * as course from "./actionTypes";
const inital_state = {
  loading: false,
  error: false,
  courses: [],
  errormessage: "",
};
const reducer = (state=inital_state,{type,payload}) => {
  console.log(payload,"payload");
switch(type){
    case course.GETCOURSE_LOADING:return {...state,loading:true};
    case course.GETCOURSE_SUCCESS:return {...state,courses:payload,loading:false};
    case course.GETCOURSE_ERROR:return {...state,error:true,loading:false,errormessage:payload};
    case course.SEARCHCOURSE_LOADING:return{...state,loading:true};
    case course.SEARCHCOURSE_SUCCESS:return {...state,loading:false,courses:payload};
    case course.SEARCHCOURSE_ERROR:return{...state,loading:false,error:true,errormessage:payload}
    default:return state
}
};

export default reducer;
