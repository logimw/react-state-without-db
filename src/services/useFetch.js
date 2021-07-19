import { useState, useEffect } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          // if !ok and response will throw here it will handle in catch
          throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
