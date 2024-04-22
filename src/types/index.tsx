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

export const MovieType = {
  POPULAR: "popular",
  TOP_RATED: "top_rated",
  NOW_PLAYING: "now_playing",
} as const;

export type MovieTypeArray = Array<(typeof MovieType)[keyof typeof MovieType]>;
