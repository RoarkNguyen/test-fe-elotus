import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "@/config/config";
import { listMovieType } from "@/constants";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useHomeFetch } from "@/hooks/useHomeFetch";
import BirdIcon from "@/icons/bird-icon";
import CloseIcon from "@/icons/close-icon";
import GridIcon from "@/icons/grid-icon";
import ListIcon from "@/icons/list-icon";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { GridCardSkeleton, ListCardSkeleton } from "../shared/skeleton";
import style from "./list.module.scss";
import { Movie } from "./movie/movie";

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
    if (searchKey.length > 0) {
      const endpoint = searchKey
        ? SEARCH_BASE_URL + searchKey
        : POPULAR_BASE_URL;
      fetchMovies(endpoint);
      alert("search");
    }
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
                    key={view.key}
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
          {state.movies && state.movies.length > 0 ? (
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
                    key={movie.id + movie.title}
                    index={index + 1}
                  />
                );
              })}
            </div>
          ) : (
            <div className={style.notFound}>
              <div>Your search did not match any results</div>
              <BirdIcon className={clsx(style.birdIcon, style.birdAnimation)} />
            </div>
          )}
          {loading && (
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

const array = [
  {
    adult: false,
    backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
    genre_ids: [28, 878, 12, 14],
    id: 823464,
    original_language: "en",
    original_title: "Godzilla x Kong: The New Empire",
    overview:
      "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
    popularity: 2213.825,
    poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
    release_date: "2024-03-27",
    title: "Godzilla x Kong: The New Empire",
    video: false,
    vote_average: 6.669,
    vote_count: 706,
  },
  {
    adult: false,
    backdrop_path: "/87IVlclAfWL6mdicU1DDuxdwXwe.jpg",
    genre_ids: [878, 12],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 2101.535,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.289,
    vote_count: 3231,
  },
  {
    adult: false,
    backdrop_path: "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
    genre_ids: [16, 28, 10751, 35, 14],
    id: 1011985,
    original_language: "en",
    original_title: "Kung Fu Panda 4",
    overview:
      "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
    popularity: 1811.637,
    poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    release_date: "2024-03-02",
    title: "Kung Fu Panda 4",
    video: false,
    vote_average: 7.161,
    vote_count: 1207,
  },
  {
    adult: false,
    backdrop_path: "/4woSOUD0equAYzvwhWBHIJDCM88.jpg",
    genre_ids: [28, 27, 53],
    id: 1096197,
    original_language: "en",
    original_title: "No Way Up",
    overview:
      "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
    popularity: 1712.647,
    poster_path: "/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
    release_date: "2024-01-18",
    title: "No Way Up",
    video: false,
    vote_average: 6.357,
    vote_count: 397,
  },
  {
    adult: false,
    backdrop_path: "/unCdljyU2FuUBDUcdZezeI9yaaj.jpg",
    genre_ids: [878, 9648, 53, 28],
    id: 720321,
    original_language: "en",
    original_title: "Breathe",
    overview:
      "Air-supply is scarce in the near future, forcing a mother and daughter to fight for survival when two strangers arrive desperate for an oxygenated haven.",
    popularity: 886.367,
    poster_path: "/wTW2t8ocWDlHns8I7vQxuqkyK58.jpg",
    release_date: "2024-04-04",
    title: "Breathe",
    video: false,
    vote_average: 5.3,
    vote_count: 48,
  },
  {
    adult: false,
    backdrop_path: "/7ZP8HtgOIDaBs12krXgUIygqEsy.jpg",
    genre_ids: [878, 28, 14, 12],
    id: 601796,
    original_language: "ko",
    original_title: "외계+인 1부",
    overview:
      "Gurus in the late Goryeo dynasty try to obtain a fabled, holy sword, and humans in 2022 hunt down an alien prisoner that is locked in a human's body. The two parties cross paths when a time-traveling portal opens up.",
    popularity: 854.88,
    poster_path: "/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg",
    release_date: "2022-07-20",
    title: "Alienoid",
    video: false,
    vote_average: 6.918,
    vote_count: 280,
  },
  {
    adult: false,
    backdrop_path: "/oe7mWkvYhK4PLRNAVSvonzyUXNy.jpg",
    genre_ids: [28, 53],
    id: 359410,
    original_language: "en",
    original_title: "Road House",
    overview:
      "Ex-UFC fighter Dalton takes a job as a bouncer at a Florida Keys roadhouse, only to discover that this paradise is not all it seems.",
    popularity: 848.609,
    poster_path: "/bXi6IQiQDHD00JFio5ZSZOeRSBh.jpg",
    release_date: "2024-03-08",
    title: "Road House",
    video: false,
    vote_average: 7.055,
    vote_count: 1520,
  },
  {
    adult: false,
    backdrop_path: "/2KGxQFV9Wp1MshPBf8BuqWUgVAz.jpg",
    genre_ids: [16, 28, 12, 35, 10751],
    id: 940551,
    original_language: "en",
    original_title: "Migration",
    overview:
      "After a migrating duck family alights on their pond with thrilling tales of far-flung places, the Mallard family embarks on a family road trip, from New England, to New York City, to tropical Jamaica.",
    popularity: 815.938,
    poster_path: "/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
    release_date: "2023-12-06",
    title: "Migration",
    video: false,
    vote_average: 7.543,
    vote_count: 1216,
  },
  {
    adult: false,
    backdrop_path: "/fUC5VsQcU3m6zmYMD96R7RqPuMn.jpg",
    genre_ids: [28, 80, 53],
    id: 1105407,
    original_language: "en",
    original_title: "Damaged",
    overview:
      "A Chicago detective travels to Scotland after an emerging serial killer’s crimes match those that he investigated five years earlier, one of which was the crime scene of his murdered girlfriend.",
    popularity: 1127.177,
    poster_path: "/tMO0YLXgJZBnIAjoTSz26zE33YN.jpg",
    release_date: "2024-04-12",
    title: "Damaged",
    video: false,
    vote_average: 5.574,
    vote_count: 27,
  },
  {
    adult: false,
    backdrop_path: "/cIztAxDn3H8JylRaJwiHHpkGe53.jpg",
    genre_ids: [10751, 35, 16],
    id: 1239146,
    original_language: "en",
    original_title: "Woody Woodpecker Goes to Camp",
    overview:
      "After getting kicked out of the forest, Woody thinks he's found a forever home at Camp Woo Hoo — until an inspector threatens to shut down the camp.",
    popularity: 698.959,
    poster_path: "/mMnzNYvpqLLLdgF5TMmXfuy6wzx.jpg",
    release_date: "2024-04-12",
    title: "Woody Woodpecker Goes to Camp",
    video: false,
    vote_average: 6.97,
    vote_count: 67,
  },
  {
    adult: false,
    backdrop_path: "/qekky2LbtT1wtbD5MDgQvjfZQ24.jpg",
    genre_ids: [28, 53],
    id: 984324,
    original_language: "fr",
    original_title: "Le salaire de la peur",
    overview:
      "When an explosion at an oil well threatens hundreds of lives, a crack team is called upon to make a deadly desert crossing with nitroglycerine in tow.",
    popularity: 650.954,
    poster_path: "/jFK2ZLQUzo9pea0jfMCHDfvWsx7.jpg",
    release_date: "2024-03-28",
    title: "The Wages of Fear",
    video: false,
    vote_average: 5.786,
    vote_count: 180,
  },
  {
    adult: false,
    backdrop_path: "/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg",
    genre_ids: [28, 14],
    id: 634492,
    original_language: "en",
    original_title: "Madame Web",
    overview:
      "Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.",
    popularity: 706.004,
    poster_path: "/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
    release_date: "2024-02-14",
    title: "Madame Web",
    video: false,
    vote_average: 5.631,
    vote_count: 1118,
  },
  {
    adult: false,
    backdrop_path: "/dcnSWFCtk4b2aIzkhq6IDbzoIf1.jpg",
    genre_ids: [28, 35],
    id: 942047,
    original_language: "en",
    original_title: "Outsource",
    overview:
      "A police chief hires an old friend, who is an international spy, to help him search for a wanted suspect in the Philippines. When the chief dies, all evidence points towards the spy, and he must go to extremes to defend himself.",
    popularity: 620.566,
    poster_path: "/zIAF0UXtCJTJOYNYWiBfyifaaOi.jpg",
    release_date: "2022-01-18",
    title: "Outsource",
    video: false,
    vote_average: 3.5,
    vote_count: 2,
  },
];
