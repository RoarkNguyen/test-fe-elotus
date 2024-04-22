import { GetServerSidePropsContext } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Array<{ id: number; name: string }>;
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
  return (
    <>
      <Head>
        <title>{movie.original_title}</title>
        <meta name="description" content={movie.original_title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <div>
          <div>{movie.original_title}</div>
          <div>{movie.overview}</div>
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
