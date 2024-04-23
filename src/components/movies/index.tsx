import { Loading } from "@/components/shared/loading/loading";
import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "@/config/config";
import { listMovieType } from "@/constants";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useHomeFetch } from "@/hooks/useHomeFetch";
import CloseIcon from "@/icons/close-icon";
import GridIcon from "@/icons/grid-icon";
import ListIcon from "@/icons/list-icon";
import clsx from "clsx";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import { Movie } from "./movie/movie";

const Movies = lazy(() => import("./list/list"));

const listDisplayView = [
  {
    name: "List view",
    key: "list-view",
    icon: <ListIcon />,
  },
  {
    name: "Grid view",
    key: "grid-view",
    icon: <GridIcon />,
  },
];

export const List = () => {
  const inputRef = useRef<any>(null);
  const {
    state,
    loading,
    error,
    movieUrlCurrent,
    handleChangeMovieType,
    fetchMovies,
  } = useHomeFetch();
  console.log(state, "_state");
  const [displayMovie, setDisplayMovie] = useState("grid-view");

  const [movieType, setMovieType] = useState("popular");

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
      <div className={style.sidebar}>
        <div className={style.labels}>
          {listMovieType &&
            listMovieType.map((item) => {
              return (
                <div
                  key={item.title}
                  onClick={() => {
                    handleChangeMovieType(item.url);
                    setMovieType(item.url);
                  }}
                  className={clsx(
                    style.label,
                    movieType === item.url && style.labelActive
                  )}
                >
                  {item.title}
                </div>
              );
            })}
        </div>
        <div className={style.sidebarCenter}>
          <div className={style.searchContainer}>
            <input
              ref={inputRef}
              id="search"
              placeholder="Search movies..."
              className={style.search}
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
            <div
              className={style.iconClose}
              onClick={() => {
                inputRef.current.value = "";
                setText("");
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className={style.sidebarRight}>
          <div className={style.listDisplayView}>
            {listDisplayView &&
              listDisplayView.map((view) => {
                return (
                  <div
                    className={clsx(
                      style.displayView,
                      displayMovie === view.key && style.displayViewActive
                    )}
                    onClick={() => setDisplayMovie(view.key)}
                  >
                    {view.icon}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={style.contentContainer}>
        <div className={style.content}>
          {loading ? (
            <Loading />
          ) : state.movies && state.movies.length > 0 ? (
            <div
              className={
                displayMovie === "list-view"
                  ? style.movieListViewContainer
                  : style.movieGridViewContainer
              }
            >
              {state.movies.map((movie, index) => {
                return (
                  <Movie
                    displayMovie={displayMovie}
                    movie={movie}
                    key={movie.id}
                    index={index + 1}
                  />
                );
              })}
            </div>
          ) : (
            <div>Movie empty</div>
          )}
        </div>

        {state.currentPage < state.totalPages && !loading && (
          <div className={style.loadMoreButtonContainer}>
            <button className={style.btnLoadMore} onClick={loadMoreMovies}>
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return { props: { data } };
}
