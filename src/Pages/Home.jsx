import {
  Center,
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
import { ScaleLoader } from "react-spinners";
const Home = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((details) => {
    return details;
  });
  useEffect(() => {
    dispatch(GetCourse());
    ProgressTracker(courses);
  }, []);

  return (
    <Stack
      direction={"column"}
      spacing="24px"
      bg={"#FFFFFF"}
      minH={"100vh"}
      w={{ lg: "95%", sm: "100%" }}
      p={4}
    >
      <NavBar />
      {loading ? (
        <Center mt={20}>
          <ScaleLoader color="#36d7b7" />
        </Center>
      ) : (
        <>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            {localStorage.getItem("user") === "teacher" && <AddCourse GetCourse={GetCourse}/>}

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
        </>
      )}
    </Stack>
  );
};

export default Home;
