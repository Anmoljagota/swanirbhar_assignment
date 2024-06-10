import * as course from "./actionTypes";
import axios from "axios";
export const GetCourse = () => async (dispatch) => {
  try {
    dispatch({ type: course.GETCOURSE_LOADING });
    const data = await axios.get(
      `https://swanirbhar-backend.onrender.com/courses`
    );
    // const data = await res.json();
    dispatch({ type: course.GETCOURSE_SUCCESS, payload: data.data });
    return data;
  } catch (err) {
    dispatch({ type: course.GETCOURSE_ERROR, payload: err });
  }
};

export const AddnewCourse = (courseDetails) => async (dispatch) => {
  try {
    dispatch({ type: course.POSTCOURSE_LOADING });
    return await fetch("https://swanirbhar-backend.onrender.com/courses", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(courseDetails),
    });
  } catch (err) {
    console.log(err);
  }
};

export const MarkLesson = (courseId, lessons) => async (dispatch) => {
  try {
    return await axios.patch(
      `https://swanirbhar-backend.onrender.com/courses/${courseId}`,
      {
        lessons,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//login details

