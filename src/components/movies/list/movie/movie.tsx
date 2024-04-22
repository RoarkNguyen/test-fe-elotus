import { Movie as MovieType } from "@/types";
import style from "./movie.module.scss";
import { useRouter } from "next/router";

type Props = {
  movie: MovieType;
};
export const Movie = ({ movie }: Props) => {
  const router = useRouter();
  return (
    <div
      className={style.container}
      onClick={() => router.push(`/${movie.id}`)}
    >
      {movie.title}
    </div>
  );
};
