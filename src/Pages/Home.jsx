import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  SimpleGrid,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CourseItems from "../components/CourseItems";
import { AddCourse } from "../components/AddCourse";
import NavBar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { GetCourse } from "../redux/courses/action";
import { ProgressTracker } from "../common/ProgressTracker";
import { ScaleLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState("");
  const { courses, loading } = useSelector((details) => details.reducer);
  useEffect(() => {
    dispatch(GetCourse());
    ProgressTracker(courses);
  }, []);

  function handleInput(e) {
    const inputData = e.target.value;
    const filteredCourses = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(inputData.toLowerCase()) ||
        course.description.toLowerCase().includes(inputData.toLowerCase())
    );
    setFilterData(filteredCourses);
  }
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

      <>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap="wrap"
        >
          {localStorage.getItem("user") === "teacher" && (
            <AddCourse GetCourse={GetCourse} />
          )}

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

          <Flex alignItems="center" mt={{ base: 4, md: 0 }}>
            <Input
              placeholder="Search course"
              maxW="200px"
              mr={4}
              onChange={handleInput}
            />
            <Select placeholder="Filter by" maxW="200px">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </Flex>
        {loading ? (
          <Center mt={20}>
            <ScaleLoader color="#36d7b7" />
          </Center>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={"40px"}>
            {filterData.length > 0
              ? filterData.map((course) => (
                  <CourseItems course={course} key={course.id} />
                ))
              : courses.length > 0 &&
                courses.map((course) => (
                  <CourseItems course={course} key={course.id} />
                ))}
          </SimpleGrid>
        )}
      </>
    </Stack>
  );
};

export default Home;
