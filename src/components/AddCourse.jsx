import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  HStack,
  Box,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
export function AddCourse() {
  const details = {
    title: "",
    description: "",
    lessons: [],
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [courseDetails, setCourseDetails] = useState(details);
  const [lesson, setLesson] = useState({ lessontitle: "", material: "" });
  const [lessontitle, setLessonTitle] = useState("Add lesson");
  function handleCourse(e) {
    const { name, value } = e.target;
    if (name === "lessontitle" || name === "material") {
      setLesson({ ...lesson, [name]: value });
      setLessonTitle("Add more lessons");
    } else {
      setCourseDetails({ ...courseDetails, [name]: value });
    }
  }
  const AddCourse = async () => {
    await fetch("http://localhost:8080/courses", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(courseDetails),
    });
  };
  console.log(courseDetails, "lo");

  function handleInput() {
    setInput(true);
    if (lesson.lessontitle && lesson.material) {
      const newcourseDetails = { ...courseDetails };
      newcourseDetails.lessons.push(lesson);
      setLesson({ lessontitle: "", material: "" });
    }
  }
  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        variant="solid"
        size="md"
        w={"20%"}
        bg={"black"}
        color={"white"}
        onClick={onOpen}
      >
        Create course
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create course</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="title"
                name="title"
                value={courseDetails.title}
                onChange={handleCourse}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Add description"
                name="description"
                value={courseDetails.description}
                onChange={handleCourse}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Add new lesson</FormLabel>

              {/* Add a new leson */}
              <HStack cursor={"pointer"} onClick={handleInput} mt={4}>
                <Box background={"#03A63C"} borderRadius={"full"} p={1}>
                  <MdOutlineAdd color="#fff" />
                </Box>
                <Text color={"#03A63C"} fontWeight={"bold"}>
                  {lessontitle}
                </Text>
              </HStack>
              {input && (
                <VStack spacing={4} mt={5}>
                  <Input
                    placeholder="Enter lesson name"
                    name="lessontitle"
                    value={lesson.lessontitle}
                    onChange={handleCourse}
                  />{" "}
                  <Textarea
                    placeholder="Type lesson description"
                    name="material"
                    value={lesson.material}
                    onChange={handleCourse}
                  />
                </VStack>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={AddCourse}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
