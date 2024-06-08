import React from "react";
import { useLocation } from "react-router-dom";

const SingleCourse = () => {
  const [data, setData] = useState({});
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, []);
  return <div></div>;
};

export default SingleCourse;
