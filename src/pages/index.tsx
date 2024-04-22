import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/movie-list.module.css";
import { List } from "@/components/movies/list/list";
import { Filter } from "@/components/movies/filter/filter";
import { Search } from "@/components/movies/search/search";

const inter = Inter({ subsets: ["latin"] });

export default function MovieList() {
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="List movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          {/* <Search /> */}
          {/*  <Filter /> */}
          <List />
        </div>
      </main>
    </>
  );
}
