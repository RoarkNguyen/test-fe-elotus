export type Movie = {
  adult: boolean;
  poster_path: string;
  id: number;
  title: string;
  original_title: string;
  vote_average: number;
  vote_count: number;
};

export type Movies = {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
};

export type MovieType = "popular" | "top_rated" | "now_playing";

export type DisplayViewType = "list-view" | "grid-view";
