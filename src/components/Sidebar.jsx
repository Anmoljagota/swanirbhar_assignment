import Styles from "../style/sidebar.module.css";
import { Avatar, Box, Center, Stack } from "@chakra-ui/react";
// import { Box, Center, Flex, Img, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Links } from "../utils/Data";
const Sidebar = () => {
  return (
    <Box
      position="sticky"
      top="0"
      left="0"
      bottom="0"
      width="14%"
      background="#FFFFFF"
      borderTop={"1px solid rgba(255,255,255,.3)"}
      borderLeft={"1px solid rgba(255,255,255,.3)"}
      height={"100vh"}
      display={{  sm: "none", base: "none",lg:"block" }}
    >
      <Box>
        <Center>
          <Avatar src="https://logodix.com/logo/1834118.png" size={"lg"} />
        </Center>

        <ul style={{ marginTop: "10px", listStyle: "none" }}>
          {Links.map((link, index) => (
            <Stack key={index}>
              <NavLink
                style={{ padding: "16px", margin: "auto" }}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? Styles.active : Styles.default
                }
              >
                <Box display="flex" alignItems="center" height="100%">
                  {link.icon}
                  <li
                    style={{
                      marginLeft: "15px",
                      textDecoration: "none",
                    }}
                  >
                    {link.title}
                  </li>
                </Box>
              </NavLink>
            </Stack>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
