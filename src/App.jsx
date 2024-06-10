// import "./App.css";
import AllRoutes from "./Routes/Route";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <Flex bg={"#F8F0F9"} gap={12}>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Sidebar />
      )}
      <Box w={"100%"}>
        <AllRoutes />
      </Box>
    </Flex>
  );
}

export default App;
