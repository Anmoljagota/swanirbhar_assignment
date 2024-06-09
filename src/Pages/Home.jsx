import { Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CourseItems from "../components/CourseItems";
import { AddCourse } from "../components/AddCourse";
import NavBar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { GetCourse } from "../redux/action";

const Home = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((details) => {
    return details;
  });
  useEffect(() => {
    dispatch(GetCourse());
  }, []);
  if (courses.length > 0) {
    const completedLessons = courses
      .flatMap((course) => course.lessons)
      .filter((lesson) => lesson.completed === true);
    const totalLessons = courses.reduce(
      (total, course) => total + course.lessons.length,
      0
    );

    const progress = Math.ceil((completedLessons.length / totalLessons) * 100);
    // console.log(progress, "p");
    localStorage.setItem("progress", progress);
  }

  if (loading) {
    return <h1>...Loading</h1>;
  }
  return (
    <Flex bg={"#F8F0F9"} gap={10}>
      <Sidebar />
      <Stack
        direction={"column"}
        spacing="24px"
        bg={"#FFFFFF"}
        minH={"100vh"}
        minW={{ sm: "95%", md: "80%", base: "95%" }}
        p={4}
      >
        <NavBar />

        <AddCourse />

        <SimpleGrid columns={[1, 2, 3]} spacing={"40px"}>
          {courses.length > 0 &&
            courses?.map((course) => {
              return <CourseItems course={course} key={course.id} />;
            })}
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default Home;
