import { TbUserCheck } from "react-icons/tb";
import { HiDocumentReport } from "react-icons/hi";
import { AiOutlineCodeSandbox, AiOutlineDribbbleSquare } from "react-icons/ai";
import { BiBox } from "react-icons/bi";
import { TbUsers, TbReportSearch } from "react-icons/tb";


export const Links = [
  { path: "/", title: "Home", icon: <AiOutlineCodeSandbox /> },
  { path: "/course", title: "Courses", icon: <BiBox /> },
  { path: "/lesson", title: "lessons", icon: <AiOutlineDribbbleSquare /> },
  { path: "/user", title: "Users", icon: <TbUsers /> },
  { path: "/teacher", title: "Teachers", icon: <HiDocumentReport /> },
  { path: "/progress", title: "Progress", icon: <AiOutlineDribbbleSquare /> },
  { path: "/admin", title: "Admin/Hr", icon: <TbUserCheck /> },
  { path: "/repoer", title: "Reporting", icon: <TbReportSearch /> },
  { path: "/members", title: "Members", icon: <AiOutlineDribbbleSquare /> },
];