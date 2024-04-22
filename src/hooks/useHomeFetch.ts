import { POPULAR_BASE_URL } from "@/config/config";
import { Movies } from "@/types";
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

  // const { isLoading, error, isError, data } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: (endpoint:string) =>
  //     fetch(endpoint).then((res) => res.json()),
  // });

  const fetchMovies = async (endpoint: string) => {
    // setError(false);
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzdlMzJmMzVlMzE3NDg3OGFlZTMzMjIxM2FiNGUzMyIsInN1YiI6IjY2MjVlMTg4MmRkYTg5MDE4N2UzMThhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNd-s-lR5wsJUhDdXrFOxsgbF-JgVXUOgRkj7NbfDdg",
      },
    };

    const isLoadMore = endpoint.search("page");

    try {
      
      let result = await (await fetch(endpoint, options)).json();

      console.log("Movies", result);
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

  return { state, loading, error, fetchMovies };
};
