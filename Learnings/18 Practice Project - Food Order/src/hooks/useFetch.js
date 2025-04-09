import { useCallback, useEffect, useState } from "react";


export function useFetch(fetchFunc, initialValue, isUseEffect) {
    console.log("🚀 ~ useFetch ~ isUseEffect:", isUseEffect)
    const [isFetching,setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchData] = useState(initialValue);

    const sendRequest = useCallback(
      async function sendRequest(fetchFunction, data) {
        setIsFetching(true);

        try {
          console.log("🚀 ~ 15 - fetch func çalışacakı",)

          const resData =  isUseEffect ? await fetchFunc() : await fetchFunction() ;
          console.log("🚀 ~ 18 - fetch func çalıştı",)

          setFetchData(resData);
        } catch (error) {
          setError({ message: error.message || 'Üzgünüz bir şeyler ters gitti' });
        }
        setIsFetching(false);
      },
      [fetchFunc]
    )

    if(isUseEffect){
      useEffect(() => {
        console.log("🚀 ~ useEffect ~ useEffect devreye girdi:")
        sendRequest()
    }, [sendRequest]);
  }

  return {
    isFetching,
    error,
    fetchedData,
    setFetchData,
    sendRequest
  }
}