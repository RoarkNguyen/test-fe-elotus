import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { List } from "@/components/movies/list/list";
import { Filter } from "@/components/movies/filter/filter";
import { Search } from "@/components/movies/search/search";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Test FE Elotus</title>
        <meta name="description" content="Test FE Elotus by Roark" />
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
