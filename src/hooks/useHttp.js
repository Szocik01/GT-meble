import { useCallback, useState } from "react";

export default function useHttp(url, initialLoadingState) {
  const [isLoading, setIsLoading] = useState(initialLoadingState || false);

  const sendRequest = useCallback(
    (handleResponse = (response) => {}, handleError = (error) => {}, requestOptions={}, urlParameters="") => {
      setIsLoading(true);
      requestOptions = { method: "GET", ...requestOptions };
      fetch(`${url}${urlParameters}`, requestOptions)
        .then((response) => {
          return handleResponse(response);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [url]
  );

  return [sendRequest, isLoading];
}
