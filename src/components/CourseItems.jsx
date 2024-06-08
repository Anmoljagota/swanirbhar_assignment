import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { RandomImages } from "../utils/RandomImages";
const CourseItems = ({ course }) => {
  return (
    <Box
      borderRadius={10}
      bgImage={`url(${RandomImages[Math.floor(Math.random() * 10)]})`}
      pos={"relative"}
      height={"300px"}
      boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
    >
      <Flex
        flexDir={"column"}
        gap={3}
        position={"absolute"}
        bg={"#FFFFFF"}
        bottom={"0"}
        h={"70%"}
        p={4}
      >
        <Heading as="h6" size="xs">
          {course.title}
        </Heading>
        <Text fontSize="xs" flexShrink={1}>
          {course.description}
        </Text>
      </Flex>
      <Link to={`/coursedetails/${course.id}`} state={course}>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
          pos={"absolute"}
          bottom={4}
          right={3}
        >
          More Details
        </Button>
      </Link>
    </Box>
  );
};

export default CourseItems;
