import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import MovieView from './views/MovieView';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header className="py-5 bg-gray-700 text-white text-center">
          Popular movies
        </header>
        <MovieView></MovieView>
      </div>
    </QueryClientProvider>
  );
}

export default App;
