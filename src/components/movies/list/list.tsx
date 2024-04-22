import {
  NOW_PLAYING_BASE_URL,
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  TOP_RATED_BASE_URL,
} from "@/config/config";
import { useHomeFetch } from "@/hooks/useHomeFetch";
import { MovieType } from "@/types";
import { useEffect, useState } from "react";
import style from "./list.module.scss";
import { Movie } from "./movie/movie";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

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
    const searchPoint = `${SEARCH_BASE_URL}${searchKey}&page=${
      state.currentPage + 1
    }`;
    const movieTypePoint = `${movieUrlCurrent}&page=${state.currentPage + 1}`;

    const endpoint = searchKey ? searchPoint : movieTypePoint;
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

  const {
    value: text,
    setValue: setText,
    debouncedValue: searchKey,
  } = useDebouncedValue<string>("");

  useEffect(() => {
    const endpoint = searchKey ? SEARCH_BASE_URL + searchKey : POPULAR_BASE_URL;
    fetchMovies(endpoint);
  }, [searchKey]);

  return (
    <div className={style.container}>
      <div>text: {text}</div>
      <div>searchKey: {searchKey}</div>
      <input type="text" onChange={(e) => setText(e.target.value)} />

      {state.totalPages}
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
