/* eslint-disable indent */
import React from 'react';

import { useInfiniteQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { getPopularMovies } from '../MovieServices';

function MovieView() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
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
    <>
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.results.map((movie) => (
            <p key={movie.id}>{movie.title}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

MovieView.propTypes = {};

export default MovieView;
