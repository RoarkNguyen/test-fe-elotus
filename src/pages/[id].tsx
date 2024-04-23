import { Back } from "@/components/shared/back/back";
import FadeIn from "@/components/shared/fade-in/fade-in";
import { IMAGE_BASE_URL, POSTER_SIZE } from "@/config/config";
import styles from "@/styles/movie-details.module.css";
import clsx from "clsx";
import { GetServerSidePropsContext } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  status: string;
  title: string;
  original_title: string;
  vote_average: number;
  vote_count: number;
};
export default function MovieDetails({ movie }: { movie: MovieDetails }) {
  const urlImage = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : "/images/no-image.png";
  return (
    <>
      <Head>
        <title>{movie.original_title}</title>
        <meta name="description" content={movie.original_title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx(styles.main, inter.className)}>
        <Back className={styles.back} />
        <div className={styles.cardMovie}>
          <div className={styles.imgContainer}>
            <FadeIn duration={500}>
              <Image
                src={urlImage}
                alt={movie.original_title}
                width={300}
                height={450}
                className={styles.image}
              />
            </FadeIn>
          </div>

          <div className={styles.infor}>
            <div className={styles.title}>{movie.original_title}</div>
            <div className={styles.desc}>{movie.overview}</div>

            <div className={styles.rating}>
              <span>IMDB Rating:</span>
              <span>{movie.vote_average}/10</span>
            </div>

            <div className={styles.genres}>
              {movie.genres.map((genre) => {
                return (
                  <div className={styles.genre} key={genre.id}>
                    {genre.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  if (!query.id) return;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const endpoint = `https://api.themoviedb.org/3/movie/${query.id}?api_key=${API_KEY}`;

  try {
    const data = await (await fetch(endpoint, options)).json();
    return {
      props: { movie: data },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}
