const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzdlMzJmMzVlMzE3NDg3OGFlZTMzMjIxM2FiNGUzMyIsInN1YiI6IjY2MjVlMTg4MmRkYTg5MDE4N2UzMThhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNd-s-lR5wsJUhDdXrFOxsgbF-JgVXUOgRkj7NbfDdg";
// const API_KEY = "b37e32f35e3174878aee332213ab4e33";

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;


export { API_URL, API_KEY, SEARCH_BASE_URL, POPULAR_BASE_URL };
