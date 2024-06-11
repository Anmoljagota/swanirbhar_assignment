import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IoMdMan } from "react-icons/io";
import { SiBookstack } from "react-icons/si";
import { Link } from "react-router-dom";
import { RandomImages } from "../utils/RandomImages";

const CourseItems = ({ course }) => {
  return (
    <Link to={`/coursedetails/${course.id}`} state={course}>
      <Box
        borderRadius={10}
        bgImage={`url(${RandomImages[Math.floor(Math.random() * 10)]})`}
        pos={"relative"}
        height={"400px"}
        boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "scale(1.05)" }}
        cursor={"pointer"}
        overflowY={"hidden"}
      >
        <Flex
          flexDir={"column"}
          gap={3}
          position={"absolute"}
          bg={"#FFFFFF"}
          bottom={"0"}
          height={"70%"}
          p={4}
          w={"100%"}
        >
          <Heading as="h6" size="sm">
            {course.title}
          </Heading>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={".7rem"}
            mt={1}
          >
            <VStack color={"#565252"}>
              <Text>Numbers of students</Text>
              <Box fontSize={".8rem"} fontWeight={"bold"}>
                <HStack>
                  <IoMdMan
                    style={{
                      background: "#D3CDCD",
                      padding: "5px",
                      fontSize: "1.2rem",
                      borderRadius: ".2rem",
                    }}
                  />{" "}
                  <Box as="span">{course["number of students"]} students</Box>
                </HStack>
              </Box>
            </VStack>
            <VStack>
              <Text>Numbers of lessons</Text>
              <Box fontSize={".8rem"} fontWeight={"bold"} p={0}>
                <HStack>
                  <SiBookstack
                    style={{
                      background: "#D3CDCD",
                      padding: "5px",
                      fontSize: "1.2rem",
                      borderRadius: ".2rem",
                    }}
                  />{" "}
                  <Box as="span">{course["number of lessons"]} lessons</Box>
                </HStack>
              </Box>
            </VStack>
          </Flex>
          <Divider borderColor="gray.300" />
          <Text fontSize="xs" flexShrink={1}>
            {course.description}
          </Text>
        </Flex>

        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
          pos={"absolute"}
          bottom={4}
          right={3}
          // top={350}
        >
          More Details
        </Button>
      </Box>
    </Link>
  );
};

export default CourseItems;
