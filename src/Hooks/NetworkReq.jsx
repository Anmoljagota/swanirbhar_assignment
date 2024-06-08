import { useEffect, useState } from "react";

const useFetch = (url, method, postdata) => {
  async function GetData(url) {
    setLoading(true);
    if (method === "GET") {
      try {
        //   setTimeout(async () => {
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false);
        setData(data);
      } catch (err) {
        setError(true);
      }
    } else {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(postdata),
        });
        const data = await res.json();
        setLoading(false);
        // setData(data);
      } catch (err) {
        setError(true);
      }
    }
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    GetData(url);
  }, []);
  return { loading, error, data };
};
export default useFetch;
