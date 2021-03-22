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
      </div>
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
