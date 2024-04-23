import { NOW_PLAYING_BASE_URL, POPULAR_BASE_URL, TOP_RATED_BASE_URL } from "@/config/config";
import { movieTypes } from "@/constants";
import { Movies } from "@/types";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export const useHomeFetch = () => {
  const [state, setState] = useState<Movies>({
    movies: [],
    currentPage: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);
  const [movieUrlCurrent, setMovieUrlCurrent] = useState(POPULAR_BASE_URL);

  const handleChangeMovieType = (type: string) => {

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
    setMovieUrlCurrent(endpoint);
    fetchMovies(endpoint);
  };


  const fetchMovies = useCallback(async (endpoint: string) => {
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const isLoadMore = endpoint.search("page");
    try {
      
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      const result = await response.json();
      
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
      toast.error("Network response was not ok");
    } finally {
      setLoading(false);
    }
  },[])

  return { state, loading, movieUrlCurrent, handleChangeMovieType, fetchMovies,setState };
};
