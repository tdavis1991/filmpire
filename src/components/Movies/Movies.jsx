import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typograghy } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination, FeaturedMovie } from '..';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const md = useMediaQuery((theme) => theme.breakpoints.only('md'));
  const numberOfMovies = md ? 18 : 20; 


  if(isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    )
  };

  if(!data.results.length) {
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography variant='h4'>
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    )
  };

  if(error) return 'An error has occured';

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPage={data.total_pages} />
    </div>
  );
};
  

export default Movies;
