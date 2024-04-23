const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ;

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
const TOP_RATED_BASE_URL = `${API_URL}movie/top_rated?api_key=${API_KEY}`;
const NOW_PLAYING_BASE_URL = `${API_URL}movie/now_playing?api_key=${API_KEY}`;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const CARD_SIZE_SMALL = 'w185';
const CARD_SIZE_LARGE = 'w342';
const POSTER_SIZE = 'w500';

export { API_URL, API_KEY, SEARCH_BASE_URL, POPULAR_BASE_URL, TOP_RATED_BASE_URL, NOW_PLAYING_BASE_URL, IMAGE_BASE_URL, POSTER_SIZE, CARD_SIZE_SMALL, CARD_SIZE_LARGE };

