import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  StackDivider,
  HStack,
  SimpleGrid,
  Badge,
  Button,
  Icon,
  Divider,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { RandomImages } from "../utils/RandomImages";
import React, { useEffect, useState } from "react";
import { FaCheck, FaLeaf, FaPlay, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SingleCourse = () => {
  const [data, setData] = useState({});
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, []);
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("green.500", "green.300");
  const buttonBg = useColorModeValue("teal.500", "teal.300");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.400");

  const handleToggleLesson = (index) => {
    setData((prevData) => ({
      ...prevData,
      lessons: prevData.lessons.map((lesson, i) =>
        i === index ? { ...lesson, completed: !lesson.completed } : lesson
      ),
    }));
  };

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
              <Image
                src={RandomImages[Math.floor(Math.random() * 10)]}
                alt={data.title}
                borderRadius="lg"
                boxShadow="xl"
                transition="all 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
                boxSize={"450px"}
              />
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
              >
                Enroll Now
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
                    onClick={() => handleToggleLesson(index)}
                  >
                    {lesson.completed ? "Mark as Incomplete" : "Mark as Complete"}
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
