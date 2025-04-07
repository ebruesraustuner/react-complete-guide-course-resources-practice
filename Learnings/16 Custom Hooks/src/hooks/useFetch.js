import { useEffect, useState } from "react";


export function useFetch(fetchFunc, initialValue) {
    const [isFetching,setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchData] = useState(initialValue);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFunc();
        setFetchData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFunc]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchData
  }
}