import { Loading } from "@/components/shared/loading/loading";
import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "@/config/config";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useHomeFetch } from "@/hooks/useHomeFetch";
import { MovieType } from "@/types";
import { useEffect } from "react";
import style from "./list.module.scss";
import { Movie } from "./movie/movie";

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

export const List = () => {
  const {
    state,
    loading,
    error,
    movieUrlCurrent,
    handleChangeMovieType,
    fetchMovies,
  } = useHomeFetch();
  console.log(state, "_state");

  const loadMoreMovies = () => {
    const searchPoint = `${SEARCH_BASE_URL}${searchKey}&page=${
      state.currentPage + 1
    }`;
    const movieTypePoint = `${movieUrlCurrent}&page=${state.currentPage + 1}`;

    const endpoint = searchKey ? searchPoint : movieTypePoint;
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
      {loading && <Loading />}
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
        {state.movies && state.movies.length > 0 ? (
          <div className="list-wrapper">
            {state.movies.map((movie) => {
              return <Movie movie={movie} key={movie.id} />;
            })}
          </div>
        ) : (
          <div>Movie empty</div>
        )}
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
