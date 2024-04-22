import { Movie as MovieType } from "@/types";
import style from "./movie.module.scss";
import { useRouter } from "next/router";
import { IMAGE_BASE_URL, POSTER_SIZE } from "@/config/config";
import Image from "next/image";

type Props = {
  movie: MovieType;
  className?: string;
};

export const Movie = ({ movie, className }: Props) => {
  const router = useRouter();
  const urlImage = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : "/images/no-image.png";

  const typeDisplay = true ? "list" : "grid";
  return (
    <div
      className={`${style.container} ${
        typeDisplay === "list" ? style.listType : style.gridType
      } ${className}`}
      onClick={() => router.push(`/${movie.id}`)}
    >
      <img
        width={typeDisplay === "list" ? 40 : 150}
        height={typeDisplay === "list" ? 60 : 225}
        src={urlImage}
        alt={movie.original_title}
      />
      <p>{movie.title}</p>
    </div>
  );
};
