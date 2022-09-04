import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutline, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import genreIcons from '../../assets/genres';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  
  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  };

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something has gone wrong go back</Link>
      </Box>
    );
  };

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img 
          className={classes.poster} 
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} 
          alt={data?.title} 
        />
      </Grid>
      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display='flex' align='center'>
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant='subtitle1' gutterBottom styles={{ marginLeft: '10px' }}>
              {(data?.vote_average / 2).toFixed(1)} / 5
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min {data?.spoken_languages.length > 0 ? `/${data?.spoken_languages[0].name}` : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genreContainer}>
          {data?.genres?.map((genre, index) => (
            <Link key={genre.name} className={classes.links} to='/' onClick={() => {}}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImages} height={30} />
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieInformation;
