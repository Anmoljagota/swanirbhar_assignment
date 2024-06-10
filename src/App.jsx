// import "./App.css";
import AllRoutes from "./Routes/Route";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Flex } from "@chakra-ui/react";
function App() {
  return (
    <Flex bg={"#F8F0F9"} gap={12}>
      <Sidebar />
      <AllRoutes />
    </Flex>
  );
}

export default App;
