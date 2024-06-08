import { Flex, SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CourseItems from "../components/CourseItems";
import { AddCourse } from "../components/AddCourse";
const Home = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const GetData = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8080/courses");
    const data = await res.json();
    setData(data);
    setLoading(false);
    console.log(data, "data..");
  };

  useEffect(() => {
    GetData();
  }, []);

  
  return (
    <Flex bg={"#F8F0F9"} gap={10}>
      <Sidebar />
      <Stack
        direction={"column"}
        spacing="24px"
        bg={"#FFFFFF"}
        minH={"100vh"}
        minW={"80%"}
        p={4}
      >
        <AddCourse  />

        <SimpleGrid columns={[1, 2, 3]} spacing={"40px"}>
          {data.length > 0 &&
            data?.map((course) => {
              return <CourseItems course={course} key={course.id} />;
            })}
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default Home;
