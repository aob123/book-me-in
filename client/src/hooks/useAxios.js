import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [error, setErrror] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setErrror(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  const updateData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setErrror(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, updateData };
};

export default useAxios;
