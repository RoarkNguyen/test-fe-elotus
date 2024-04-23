import { Movie as MovieType } from "@/types";
import { memo } from "react";
import style from "../list.module.scss";
import { Movie } from "../movie/movie";

const Movies = ({
  movies,
  displayMovie,
}: {
  displayMovie: string;
  movies: MovieType[];
}) => {
  return (
    <div
      className={
        displayMovie === "list-view"
          ? style.movieListViewContainer
          : style.movieGridViewContainer
      }
    >
      {movies.map((movie, index) => {
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
  );
};

const MemoizedMovies = memo(Movies);

export default MemoizedMovies;
