import { useHomeFetch } from "@/hooks/useHomeFetch";
import style from "./list.module.scss";
import { Movie } from "./movie/movie";
import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "@/config/config";

export const List = () => {
  const { state, loading, error, fetchMovies } = useHomeFetch();
  console.log(state, "_state");

  const loadMoreMovies = () => {
    // const searchPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
    const popularPoint = `${POPULAR_BASE_URL}&page=${state.currentPage + 1}`;

    // const endpoint = searchTerm ? searchPoint : popularPoint;
    const endpoint = popularPoint;
    fetchMovies(endpoint);
    //console.log('loaded');
  };
  return (
    <div className={style.container}>
      {state.movies.map((movie) => {
        return <Movie movie={movie} key={movie.id} />;
      })}

      {state.currentPage < state.totalPages && !loading && (
        <button onClick={loadMoreMovies}>load more</button>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return { props: { data } };
}
