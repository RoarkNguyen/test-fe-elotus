import { List } from "@/components/movies/list";
import styles from "@/styles/movie-list.module.css";
import Head from "next/head";

export default function MovieList() {
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="List movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <List />
      </main>
    </>
  );
}
