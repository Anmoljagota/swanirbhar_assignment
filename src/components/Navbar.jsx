import React from "react";
import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Button,
  Avatar,
  AvatarBadge,
  Image,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const ShowOrNot = useBreakpointValue({ base: false, lg: true });
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <Flex
      justifyContent={"flex-start"}
      backgroundColor="#35382E"
      boxShadow="var(primary-bs)"
      backdropFilter={"--bg-filter"}
      p={2}
      w={"100%"}
      borderRadius={5}
    >
      <Flex justifyContent={"space-between"} px={10} w={"100%"}>
        {!ShowOrNot && (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  bg={"none"}
                  border={"none"}
                >
                  <HamburgerIcon color={"white"} />
                </MenuButton>
                <MenuList>
                  <MenuItem bg={"black"} color={"#FFFFFF"}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => alert("Kagebunshin")}>
                    Products
                  </MenuItem>
                  <MenuItem onClick={() => alert("Kagebunshin")}>
                    Members
                  </MenuItem>
                  <MenuItem onClick={() => alert("Kagebunshin")}>
                    Sales
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        )}
        {ShowOrNot && (
          <Image
            src={
              "https://res.cloudinary.com/megamart/image/upload/f_auto,q_auto/v1/Analytics%20Dashboard/glfxm8pjygdmogygwxpt"
            }
          />
        )}
        <HStack color={"#9B8C8D"} spacing={5}>
          <Avatar size="sm" src="https://bit.ly/dan-abramov">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Text>
            {localStorage.getItem("token")
              ? localStorage.getItem("token")
              : "Johnson smith"}
          </Text>
          <Text cursor={"pointer"} onClick={handleLogout}>
            Logout
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default NavBar;
