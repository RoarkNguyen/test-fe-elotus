import { Movie as MovieType } from "@/types";
import style from "./movie.module.scss";

type Props = {
  movie: MovieType;
};
export const Movie = ({ movie }: Props) => {
  return <div className={style.container}>{movie.title}</div>;
};
