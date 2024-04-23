import clsx from "clsx";
import styles from "./index.module.scss";

export const GridCardSkeleton = () => {
  return <div className={clsx(styles.skeleton, styles.skeletonGridCard)}></div>;
};

export const ListCardSkeleton = () => {
  return (
    <div className={styles.skeletonListCard}>
      <div className={clsx(styles.skeleton, styles.number)}></div>
      <div className={clsx(styles.skeleton, styles.image)}></div>
      <div className={clsx(styles.skeleton, styles.title)}></div>
    </div>
  );
};
