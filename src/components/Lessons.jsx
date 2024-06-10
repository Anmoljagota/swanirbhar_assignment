import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
const Lessons = ({ lesson, index, id, handleToggleLesson }) => {
  const cardHoverBg = useColorModeValue("gray.100", "gray.700");
  return (
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
          onClick={() => handleToggleLesson(index, id, lesson.lessontitle)}
        >
          {lesson.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
      </VStack>
    </Box>
  );
};

export default Lessons;
