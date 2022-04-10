import { useState, useEffect, useCallback } from "react";
import { toQueryString } from "../lib/toQueryString";
import { DEFAULT_API_LIMIT } from "../constatns";

type Response<T> = {
  data: Array<T> | null;
  loading: boolean;
  error: Error | null;
  // fetchMore: (page: number, limit: number) => void;
  isNextPageAvailable: boolean;
};

const useFetch = <T>(
  url: string,
  method: string,
  params?: Record<string, any>
): Response<T> => {
  const [data, setData] = useState<Array<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);

  useEffect(() => {
    setLoading(true);

    let parametrizedUrl = url;

    if (params) {
      const serializedParams = toQueryString(params);
      parametrizedUrl = `${parametrizedUrl}?${serializedParams}`;
    }

    fetch(parametrizedUrl, {
      method,
    })
      .then((response) => {
        // TODO: tmp
        if (!response.ok) {
          throw new Error("Something went wrong...");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        const { data, total } = parsedResponse;

        const skipped = params?.start ? params.start : 0;

        if (data.length + skipped === total) {
          setIsNextPageAvailable(false);
        } else {
          setIsNextPageAvailable(true);
        }

        return data;
      })
      .then((data) => {
        return setData(data);
      })
      .catch((error: Error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [method, url]);

  // const fetchMore = useCallback(
  //   async (page: number, limit: number) => {
  //     if (!data) return [];
  //     setLoading(true);
  //     const response = await fetch(`${url}?_page=${page}&_limit=${limit}`, {
  //       method: "GET",
  //     });

  //     const total = data.length;
  //     const parsedResponse = await response.json();
  //     const merged = [...data, ...parsedResponse];

  //     if (merged.length === total) setIsNextPageAvailable(false);

  //     setData(merged);
  //     setLoading(false);
  //   },
  //   [data, url]
  // );

  return {
    data,
    loading,
    error,
    // fetchMore,
    isNextPageAvailable,
  };
};

export default useFetch;
