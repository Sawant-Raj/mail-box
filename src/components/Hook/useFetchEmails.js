import { useEffect, useState } from "react";

const useFetchEmails = (url) => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmails = async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch emails.");
      }

      const data = await response.json();

      const loadedEmails = [];
      for (const key in data) {
        loadedEmails.push({
          id: key,
          ...data[key],
        });
      }

      setEmails(loadedEmails);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();

    const intervalId = setInterval(fetchEmails, 2000);

    return () => clearInterval(intervalId);
  }, [url]);

  return { emails, isLoading, error, fetchEmails };
};

export default useFetchEmails;
