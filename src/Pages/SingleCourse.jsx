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
  Divider,
  Flex,
  useColorModeValue,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaLeaf, FaPlay, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MarkLesson } from "../redux/action";
const SingleCourse = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((details) => {
    return details;
  });
  const [data, setData] = useState({});
  const { state } = useLocation();

  const enrolledData = JSON.parse(localStorage.getItem("enrolled")) || [];
  const isEnrolled = enrolledData.includes(state.id);
  const [text, setText] = useState(isEnrolled ? "Enrolled" : "Enroll Now");
  const [disabled, setDisabled] = useState(isEnrolled ? true : false);
  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, []);
  const cardHoverBg = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("green.500", "green.300");
  const buttonBg = useColorModeValue("teal.500", "teal.300");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.400");

  const handleToggleLesson = (index, id, lessonname) => {
    setData((prevData) => ({
      ...prevData,
      lessons: prevData.lessons.map((lesson, i) =>
        i === index ? { ...lesson, completed: !lesson.completed } : lesson
      ),
    }));
    Progress(id, lessonname);
  };

  async function Enrolled(id) {
    try {
      await axios.patch(`http://localhost:8080/courses/${id}`, {
        "number of students": data["number of students"] + 1,
      });
      const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
      enrolled.push(id);
      localStorage.setItem("enrolled", JSON.stringify(enrolled));
      setText("Enrolled");
      setDisabled(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function Progress(courseid, lessonname) {
    courses.forEach((ele) => {
      if (ele.id === courseid) {
        const updatedLessons = ele.lessons.map((lesson) => {
          return lesson.lessontitle === lessonname
            ? { ...lesson, completed: !lesson.completed }
            : lesson;
        });
        dispatch(MarkLesson(courseid, updatedLessons));
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
                value={40}
                color="orange.400"
                thickness={"16px"}
                size={{ base: "150px", sm: "200px", md: "300px" }}
              >
                <CircularProgressLabel>40%</CircularProgressLabel>
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
              <Box
                key={index}
                p={5}
                shadow="lg"
                borderWidth="1px"
                borderRadius="lg"
                bg={lesson.completed ? "green.200" : "red.200"}
                transition="all 0.3s ease-in-out"
                _hover={{ bg: cardHoverBg, transform: "scale(1.05)" }}
              >
                <VStack align="start" spacing={4}>
                  <HStack spacing={2}>
                    <Icon
                      as={lesson.completed ? FaCheck : FaTimes}
                      color={lesson.completed ? "green.400" : "red.400"}
                      w={6}
                      h={6}
                    />
                    <Heading
                      fontSize="lg"
                      color={lesson.completed ? "green.700" : "red.700"}
                    >
                      {lesson.lessontitle}
                    </Heading>
                  </HStack>
                  <Divider />
                  <Text mt={2} color="gray.600">
                    {lesson.material}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme={lesson.completed ? "green" : "red"}
                    onClick={() =>
                      handleToggleLesson(index, data.id, lesson.lessontitle)
                    }
                  >
                    {lesson.completed
                      ? "Mark as Incomplete"
                      : "Mark as Complete"}
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default SingleCourse;
