import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import CourseItems from "../components/CourseItems";
import { AddCourse } from "../components/AddCourse";
import NavBar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { GetCourse } from "../redux/action";
import { ProgressTracker } from "../common/ProgressTracker";
const Home = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((details) => {
    return details;
  });
  useEffect(() => {
    dispatch(GetCourse());
    ProgressTracker(courses);
  }, []);

  if (loading) {
    return <h1>...Loading</h1>;
  }
  return (
    <Flex
      gap={10}
      minW={{ sm: "95%",lg:"80%", base: "95%" }}
    >

      <Stack
        direction={"column"}
        spacing="24px"
        bg={"#FFFFFF"}
        minH={"100vh"}
        w={"100%"}
        p={4}
      >
        <NavBar />
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          {localStorage.getItem("user") === "teacher" && <AddCourse />}

          <CircularProgress
            value={
              localStorage.getItem("progress")
                ? localStorage.getItem("progress")
                : "0%"
            }
            color="orange.400"
            thickness={"16px"}
            size={{ base: "50px", md: "100px" }}
          >
            <CircularProgressLabel>
              {localStorage.getItem("progress")
                ? `${localStorage.getItem("progress")}%`
                : "0%"}
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>

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
