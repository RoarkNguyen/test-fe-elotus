import { List } from "@/components/movies/list";
import styles from "@/styles/movie-list.module.css";
import Head from "next/head";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function MovieList({ state }: { state: any }) {
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="List movies" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx(styles.main, inter.className)}>
        <List stateProps={state} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const result = await response.json();
    return {
      props: { state: result },
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
