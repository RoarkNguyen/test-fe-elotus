import FadeIn from "@/components/shared/fade-in/fade-in";
import { IMAGE_BASE_URL, POSTER_SIZE } from "@/config/config";
import { Movie as MovieType } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "./movie.module.scss";

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
    <Link
      className={clsx(
        displayMovie === "list-view" ? style.listType : style.gridType,
        className
      )}
      href={`/${movie.id}`}
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
          <FadeIn>
            <Image
              width={displayMovie === "list-view" ? 40 : 80}
              height={displayMovie === "list-view" ? 60 : 120}
              src={urlImage}
              className={style.image}
              alt={movie.original_title}
              loading="lazy"
            />
          </FadeIn>
        </div>

        <div className={clsx(displayMovie === "grid-view" && style.info)}>
          {movie.title}
        </div>
      </div>
    </Link>
  );
};
