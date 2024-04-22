import { useDebouncedValue } from "@/hooks/use-debounced-value";
import style from "./search.module.scss";
import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "@/config/config";
import { useHomeFetch } from "@/hooks/useHomeFetch";
import { useEffect } from "react";

export const Search = () => {
  const { state, loading, error, fetchMovies } = useHomeFetch();

  const {
    value: text,
    setValue: setText,
    debouncedValue: searchKey,
  } = useDebouncedValue<string>("");

  useEffect(() => {
    const endpoint = searchKey ? SEARCH_BASE_URL + searchKey : POPULAR_BASE_URL;
    fetchMovies(endpoint);
  }, [searchKey]);

  return (
    <div className={style.container}>
      <div>text: {text}</div>
      <div>searchKey: {searchKey}</div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
    </div>
  );
};
