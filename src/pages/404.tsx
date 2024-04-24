import { Inter } from "next/font/google";
import styles from "@/styles/not-found.module.css";
import clsx from "clsx";
import FadeIn from "@/components/shared/fade-in/fade-in";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Custom404() {
  return (
    <main className={clsx(styles.main, inter.className)}>
      <div className={styles.content}>
        <h1 className="">404 – Page not found</h1>
        <p className="">The page you are looking is not found!</p>
      </div>
    </main>
  );
}
