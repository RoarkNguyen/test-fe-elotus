import { Movie as MovieType } from "@/types";
import style from "./movie.module.scss";
import { useRouter } from "next/router";
import { IMAGE_BASE_URL, POSTER_SIZE } from "@/config/config";
import Image from "next/image";

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
      className={`${style.container} ${
        displayMovie === "list-view" ? style.listType : style.gridType
      } ${className}`}
      onClick={() => router.push(`/${movie.id}`)}
    >
      {displayMovie === "list-view" && <div>{index}</div>}
      <img
        width={displayMovie === "list-view" ? 40 : 80}
        height={displayMovie === "list-view" ? 60 : 120}
        src={urlImage}
        alt={movie.original_title}
      />
      <p>{movie.title}</p>
    </div>
  );
};
