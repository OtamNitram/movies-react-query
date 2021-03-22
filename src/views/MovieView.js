/* eslint-disable indent */
import React from 'react';

import { useInfiniteQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import MovieCard from '../components/MovieCard';
import { getPopularMovies } from '../services/MovieServices';

function MovieView() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('projects', getPopularMovies, {
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="container mx-auto px-4 pt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((movie) => (
              <MovieCard
                key={movie.id}
                description={movie.overview}
                id={movie.id}
                imagePath={movie.poster_path}
                releaseDate={movie.release_date}
                title={movie.title}
                voteAverage={movie.vote_average}></MovieCard>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="p-4 ">
        <button
          className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mx-auto animate-spin w-5 h-5 fill-current ">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          ) : hasNextPage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mx-auto animate-bounce w-5 h-5 fill-current ">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            'Nothing more to load'
          )}
        </button>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery('projects', getPopularMovies, {
  //   getNextPageParam: (lastPage) =>
  //     lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  // });
  // if (error) return 'An error has occurred: ' + error.message;
  // return status === 'loading' ? (
  //   <p>Loading...</p>
  // ) : status === 'error' ? (
  //   <p>Error: {error.message}</p>
  // ) : (
  //   <>
  //     {data.pages.map((page, i) => (
  //       <React.Fragment key={i}>
  //         {page.results.map((movie) => (
  //           <p key={movie.id}>{movie.title}</p>
  //         ))}
  //       </React.Fragment>
  //     ))}
  //     <div>
  //       <button
  //         onClick={() => fetchNextPage()}
  //         disabled={!hasNextPage || isFetchingNextPage}>
  //         {isFetchingNextPage
  //           ? 'Loading more...'
  //           : hasNextPage
  //           ? 'Load More'
  //           : 'Nothing more to load'}
  //       </button>
  //     </div>
  //     <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
  //     <ReactQueryDevtools initialIsOpen />
  //   </>
  // );
}

MovieView.propTypes = {};

export default MovieView;
