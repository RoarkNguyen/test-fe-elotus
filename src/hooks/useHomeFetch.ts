import { NOW_PLAYING_BASE_URL, POPULAR_BASE_URL, TOP_RATED_BASE_URL } from "@/config/config";
import { MovieType, Movies } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const useHomeFetch = () => {
  const [state, setState] = useState<Movies>({
    movies: [],
    currentPage: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieUrlCurrent, setMovieUrlCurrent] = useState(POPULAR_BASE_URL);
  // const { isLoading, error, isError, data } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: (endpoint:string) =>
  //     fetch(endpoint).then((res) => res.json()),
  // });

  const handleChangeMovieType = (type: string) => {
    console.log(type, "_type");

    let endpoint = "";

    switch (type) {
      case MovieType.POPULAR:
        endpoint = POPULAR_BASE_URL;
        break;

      case MovieType.TOP_RATED:
        endpoint = TOP_RATED_BASE_URL;
        break;

      case MovieType.NOW_PLAYING:
        endpoint = NOW_PLAYING_BASE_URL;
        break;

      default:
        endpoint = POPULAR_BASE_URL;
        break;
    }
    console.log(endpoint, "_endpoint change movie");
    setMovieUrlCurrent(endpoint);
    fetchMovies(endpoint);
  };

  const fetchMovies = async (endpoint: string) => {
    // setError(false);
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const isLoadMore = endpoint.search("page");
    const isQuery = endpoint.search("query");
    console.log(isQuery,"reset movies when search")
    // if(isQuery !== -1) {
    //   setState((prev) => ({
    //     ...prev,
    //     movies: [],
    //   }));
    // }
    try {
      
      let result = await (await fetch(endpoint, options)).json();

      console.log("Movies", result);
      const isAdd = isLoadMore !== -1 && isQuery === -1
      console.log("isAdd", isAdd);
      console.log("result.results", result.results);

      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1 
            ? [...prev.movies, ...result.results]
            : [...result.results],
        currentPage: result.page,
        totalPages: result.total_pages,
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(`${POPULAR_BASE_URL}`);
  }, []);

  return { state, loading, error, movieUrlCurrent, handleChangeMovieType, fetchMovies };
};
