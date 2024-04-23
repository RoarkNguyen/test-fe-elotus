import { NOW_PLAYING_BASE_URL, POPULAR_BASE_URL, TOP_RATED_BASE_URL } from "@/config/config";
import { movieTypes } from "@/constants";
import { Movies } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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
      case movieTypes.POPULAR:
        endpoint = POPULAR_BASE_URL;
        break;

      case movieTypes.TOP_RATED:
        endpoint = TOP_RATED_BASE_URL;
        break;

      case movieTypes.NOW_PLAYING:
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
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const isLoadMore = endpoint.search("page");
    const isQuery = endpoint.search("query");
    
    try {
      
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      const result = await response.json();

      console.log("Movies", result);
      const isAdd = isLoadMore !== -1 && isQuery === -1
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
      console.log(error,"_error data");
      toast.error("Network response was not ok");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(`${POPULAR_BASE_URL}`);
  }, []);

  return { state, loading, error, movieUrlCurrent, handleChangeMovieType, fetchMovies };
};
