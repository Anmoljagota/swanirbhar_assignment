import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Button,
  Icon,
  Flex,
  useColorModeValue,
  CircularProgress,
  CircularProgressLabel,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaLeaf, FaPlay } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetCourse, MarkLesson } from "../redux/action";
import Lessons from "../components/Lessons";
const SingleCourse = () => {
  const toast = useToast();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { courses } = useSelector((details) => {
    return details;
  });
  const { id } = useParams();
  // console.log(id,"i am id");
  async function GetSinglecourse(courseId) {
    const data = await axios.get(
      `https://swanirbhar-backend.onrender.com/courses/${courseId}`
    );
    setData(data.data);
  }

  const iconColor = useColorModeValue("green.500", "green.300");
  const buttonBg = useColorModeValue("teal.500", "teal.300");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.400");
  // GETTING WHOLE DATA USING REDUX of courses

  const enrolledData = JSON.parse(localStorage.getItem("enrolled")) || [];

  const isEnrolled = enrolledData.includes(state.id);

  const [text, setText] = useState(isEnrolled ? "Enrolled" : "Enroll Now");
  const [disabled, setDisabled] = useState(isEnrolled ? true : false);

  useEffect(() => {
    GetSinglecourse(id);
  }, []);

  // toggle to mark as compelete or notcomplete lesson
  const handleToggleLesson = (index, id, lessonname) => {
    if (!disabled) {
      toast({
        title: `Enroll first`,
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    } else {
      setData((prevData) => ({
        ...prevData,
        lessons: prevData.lessons.map((lesson, i) =>
          i === index ? { ...lesson, completed: !lesson.completed } : lesson
        ),
      }));
      Progress(id, lessonname);
    }
  };

  //this function is created to enrolled the user to a particular course
  async function Enrolled(id) {
    try {
      await axios.patch(
        `https://swanirbhar-backend.onrender.com/courses/${id}`,
        {
          "number of students": data["number of students"] + 1,
        }
      );
      const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
      enrolled.push(id);
      localStorage.setItem("enrolled", JSON.stringify(enrolled));
      setText("Enrolled");
      setDisabled(true);
    } catch (err) {
      console.log(err);
    }
  }
  // this function is created to check the user progress
  async function Progress(courseid, lessonname) {
    courses.forEach((ele) => {
      if (ele.id === courseid) {
        const updatedLessons = ele.lessons.map((lesson) => {
          return lesson.lessontitle === lessonname
            ? { ...lesson, completed: !lesson.completed }
            : lesson;
        });
        // console.log(updatedLessons, "che..");
        dispatch(MarkLesson(courseid, updatedLessons)).then(() => {
          dispatch(GetCourse());
        });
      }
    });
  }
  return (
    <Box padding="20px" maxW="1200px" mx="auto">
      {data && data.title && (
        <>
          <Flex
            direction={{ base: "column", md: "row" }}
            mb={10}
            align="center"
          >
            <Box flex="1" mb={{ base: 6, md: 0 }} p={5}>
              <CircularProgress
                value={
                  localStorage.getItem("progress")
                    ? localStorage.getItem("progress")
                    : "0%"
                }
                color="orange.400"
                thickness={"16px"}
                size={{ base: "150px", sm: "200px", md: "300px" }}
              >
                <CircularProgressLabel>
                  {localStorage.getItem("progress")
                    ? `${localStorage.getItem("progress")}%`
                    : "0%"}
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <VStack flex="1" align="start" spacing={4} pl={{ md: 10 }}>
              <HStack spacing={2}>
                <Icon as={FaLeaf} w={6} h={6} color={iconColor} />
                <Heading as="h1" size="2xl" color={iconColor}>
                  {data.title}
                </Heading>
              </HStack>
              <Text fontSize="lg" color="gray.700">
                {data.description}
              </Text>
              <Badge colorScheme="pink" fontSize="1em">
                New Course
              </Badge>
              <Button
                bg={buttonBg}
                color="white"
                size="lg"
                rightIcon={<Icon as={FaPlay} />}
                _hover={{ bg: buttonHoverBg }}
                onClick={() => Enrolled(data.id)}
                isDisabled={disabled}
              >
                {text}
              </Button>
            </VStack>
          </Flex>
          <Heading as="h2" size="lg" mb="6" color="teal.600">
            Lessons
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {data.lessons.map((lesson, index) => (
              <Lessons
                lesson={lesson}
                index={index}
                key={index}
                id={data.id}
                handleToggleLesson={() =>
                  handleToggleLesson(index, id, lesson.lessontitle)
                }
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default SingleCourse;
