import { useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setError(data.error);
        setBookings(data);
        setLoading(false);
      });
  }, [url]);

  return { bookings, loading, error };
};

export default useFetch;
