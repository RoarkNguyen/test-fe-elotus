import { Movie as MovieType } from "@/types";
import style from "./movie.module.scss";
import { useRouter } from "next/router";
import { IMAGE_BASE_URL, POSTER_SIZE } from "@/config/config";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  movie: MovieType;
  className?: string;
  index: number;
  displayMovie: string;
};

export const Movie = ({ movie, displayMovie, index, className }: Props) => {
  const router = useRouter();
  const urlImage = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : "/images/no-image.png";

  return (
    <div
      className={clsx(
        displayMovie === "list-view" ? style.listType : style.gridType,
        className
      )}
      onClick={() => router.push(`/${movie.id}`)}
    >
      <div
        className={clsx(
          style.content,
          displayMovie === "list-view" ? style.listType : style.gridType
        )}
      >
        {displayMovie === "list-view" && (
          <div className={style.number}>{index}</div>
        )}
        <div className={style.imgContainer}>
          <img
            width={displayMovie === "list-view" ? 40 : 80}
            height={displayMovie === "list-view" ? 60 : 120}
            src={urlImage}
            className={style.image}
            alt={movie.original_title}
          />
        </div>

        <div className={clsx(displayMovie === "grid-view" && style.info)}>
          {movie.title}
        </div>
      </div>
    </div>
  );
};
