import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "@/config/config";
import { listMovieType } from "@/constants";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useHomeFetch } from "@/hooks/useHomeFetch";
import CloseIcon from "@/icons/close-icon";
import GridIcon from "@/icons/grid-icon";
import ListIcon from "@/icons/list-icon";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { GridCardSkeleton, ListCardSkeleton } from "../shared/skeleton";
import style from "./list.module.scss";
import { Movie } from "./movie/movie";
import MemoizedMovies from "./results/results";

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

export const List = ({ stateProps }: { stateProps: any }) => {
  const inputRef = useRef<any>(null);
  const {
    state,
    loading,
    movieUrlCurrent,
    handleChangeMovieType,
    fetchMovies,
    setState,
  } = useHomeFetch();

  const [displayMovie, setDisplayMovie] = useState("grid-view");

  const [movieType, setMovieType] = useState("popular");

  const {
    value: text,
    setValue: setText,
    debouncedValue: searchKey,
  } = useDebouncedValue<string>("");

  const loadMoreMovies = () => {
    const searchPoint = `${SEARCH_BASE_URL}${searchKey}&page=${
      state.currentPage + 1
    }`;
    const movieTypePoint = `${movieUrlCurrent}&page=${state.currentPage + 1}`;

    const endpoint = searchKey ? searchPoint : movieTypePoint;
    fetchMovies(endpoint);
  };

  useEffect(() => {
    const endpoint = searchKey ? SEARCH_BASE_URL + searchKey : POPULAR_BASE_URL;
    fetchMovies(endpoint);
  }, [searchKey]);

  useEffect(() => {
    setState(() => ({
      movies: [...stateProps.results],
      currentPage: stateProps.page,
      totalPages: stateProps.total_pages,
    }));
  }, [stateProps]);

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
              aria-label="Clear search"
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
                    key={view.key}
                    className={clsx(
                      style.displayView,
                      displayMovie === view.key && style.displayViewActive
                    )}
                    onClick={() => setDisplayMovie(view.key)}
                    aria-label={view.name}
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
          {state.currentPage === 0 ? (
            <SkeletonMovies displayMovie={displayMovie} />
          ) : state.movies && state.movies.length > 0 ? (
            <MemoizedMovies movies={state.movies} displayMovie={displayMovie} />
          ) : (
            <div className={style.notFound}>
              <div>Your search did not match any results</div>
            </div>
          )}
          {loading && <SkeletonMovies displayMovie={displayMovie} />}
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

const SkeletonMovies = ({ displayMovie }: { displayMovie: string }) => {
  return (
    <div
      className={clsx(
        style.skeleton,
        displayMovie === "list-view"
          ? style.movieListViewContainer
          : style.movieGridViewContainer
      )}
    >
      {Array.from({ length: 5 }).map((item, index) => {
        if (displayMovie === "list-view") {
          return <ListCardSkeleton key={index} />;
        }
        return <GridCardSkeleton key={index} />;
      })}
    </div>
  );
};
