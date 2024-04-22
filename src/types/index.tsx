export type Movie = {
  adult: boolean;
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type Movies = {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
};
