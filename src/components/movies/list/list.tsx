import { useHomeFetch } from "@/hooks/useHomeFetch";
import style from "./list.module.scss";
import { Movie } from "./movie/movie";
import {
  NOW_PLAYING_BASE_URL,
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  TOP_RATED_BASE_URL,
} from "@/config/config";
import { useEffect, useState } from "react";
import { MovieType } from "@/types";

export const List = () => {
  const { state, loading, error, fetchMovies } = useHomeFetch();
  console.log(state, "_state");
  const [movieUrlCurrent, setMovieUrlCurrent] = useState(POPULAR_BASE_URL);
  const listMovieType = [
    {
      title: "Popular",
      url: MovieType.POPULAR,
    },
    {
      title: "Top rated",
      url: MovieType.TOP_RATED,
    },
    {
      title: "Now playing",
      url: MovieType.NOW_PLAYING,
    },
  ];

  const loadMoreMovies = () => {
    // const searchPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
    const movieTypePoint = `${movieUrlCurrent}&page=${state.currentPage + 1}`;

    // const endpoint = searchTerm ? searchPoint : popularPoint;
    const endpoint = movieTypePoint;
    fetchMovies(endpoint);
    //console.log('loaded');
  };

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
  return (
    <div className={style.container}>
      <div>
        {listMovieType.map((item) => {
          return (
            <div
              key={item.title}
              onClick={() => handleChangeMovieType(item.url)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div>
        {state.movies.map((movie) => {
          return <Movie movie={movie} key={movie.id} />;
        })}
      </div>

      {state.currentPage < state.totalPages && !loading && (
        <button onClick={loadMoreMovies}>load more</button>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return { props: { data } };
}
