import { IMAGE_BASE_URL, POSTER_SIZE } from "@/config/config";
import styles from "@/styles/movie-details.module.css";
import { GetServerSidePropsContext } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

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
  console.log(movie, "_movie");
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
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.cardMovie}>
          <div className={styles.imgContainer}>
            <img
              src={urlImage}
              alt={movie.original_title}
              width={300}
              height={450}
              className={styles.image}
            />
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
  console.log(query, "_query");
  if (!query.id) return;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const endpoint = `https://api.themoviedb.org/3/movie/${query.id}?api_key=${API_KEY}`;
  console.log(endpoint, "_endpoint");

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
