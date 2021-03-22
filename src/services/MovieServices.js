import axios from 'axios';

// *** Add you theMoviedb.org token here ***
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTY3OGZiNDI4M2M1MTNhODAxYTFmODBjY2VjODllNiIsInN1YiI6IjYwNTZjZDJlNDU1N2EwMDA1MjEyZjU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PZg60jSNXGULeBIz692I93xjbyqZ_MOz0AyNJ7_lKWU';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `bearer ${AUTH_TOKEN}`;

export function getPopularMovies({ pageParam = 1 }) {
  return axios(`/movie/popular?page=${pageParam}`).then(
    (result) => result.data,
  );
}

export default { getPopularMovies };
