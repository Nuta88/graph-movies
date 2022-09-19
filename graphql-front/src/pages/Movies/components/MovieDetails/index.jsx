import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';

import { GET_MOVIE } from '../../../../graphql/queries';

const MovieDetails = () => {
  const { id } = useParams();
  const { loading, data: { movie } = {} } = useQuery(GET_MOVIE, {
    variables: { movieId: id },
  });

  return (
    <Card
      sx={{ height: '100%' }}
      data-testid="movie-detail-card"
    >
      <CardContent sx={{ height: '100%' }}>
        {!loading && movie && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              height: '100%',
            }}
          >
            <Box>Movie name: {movie.name}</Box>
            <Box>Director name: {movie.director?.name}</Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieDetails;
