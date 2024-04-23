import ChevronLeftIcon from "@/icons/chevron-left-icon";
import style from "./back.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";

export const Back = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={clsx(style.container, className)}
    >
      <ChevronLeftIcon />
      <div>Back</div>
    </div>
  );
};
