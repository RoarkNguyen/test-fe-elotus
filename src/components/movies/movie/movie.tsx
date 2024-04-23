import FadeIn from "@/components/shared/fade-in/fade-in";
import { CARD_SIZE, IMAGE_BASE_URL } from "@/config/config";
import { Movie as MovieType } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import style from "./movie.module.scss";

type Props = {
  movie: MovieType;
  className?: string;
  index: number;
  displayMovie: string;
};

export const Movie = ({ movie, displayMovie, index, className }: Props) => {
  const urlImage = movie.poster_path
    ? `${IMAGE_BASE_URL}${CARD_SIZE}${movie.poster_path}`
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
              placeholder="blur"
              blurDataURL="/images/blur-image.png"
            />
          </FadeIn>
        </div>

        <div
          className={clsx(
            displayMovie === "grid-view" ? style.gridInfo : style.listInfo
          )}
        >
          {movie.title}
        </div>
      </div>
    </Link>
  );
};
