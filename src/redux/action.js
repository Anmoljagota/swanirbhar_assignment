import * as course from "./actionTypes";
import axios from "axios";
export const GetCourse = () => async (dispatch) => {
  try {
    dispatch({ type: course.GETCOURSE_LOADING });
    const data = await axios.get(`http://localhost:8080/courses`);
    // const data = await res.json();
    dispatch({ type: course.GETCOURSE_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: course.GETCOURSE_ERROR, payload: err });
  }
};

export const AddnewCourse = (courseDetails) => async (dispatch) => {
  try {
    dispatch({ type: course.POSTCOURSE_LOADING });
    await fetch("http://localhost:8080/courses", {
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
    await axios.patch(`http://localhost:8080/courses/${courseId}`, {
      lessons,
    });
  } catch (err) {
    console.log(err);
  }
};
