import axios from 'axios';

// *** Add you theMoviedb.org token here ***
const AUTH_TOKEN = 'YOUR TOKEN HERE';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `bearer ${AUTH_TOKEN}`;

export function getPopularMovies({ pageParam = 1 }) {
  return axios(`/movie/popular?page=${pageParam}`).then(
    (result) => result.data,
  );
}

export default { getPopularMovies };
