import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button } from '@mui/material';

import MovieTable from './components/MovieTable';
import MovieModal from './components/MovieModal';
import { ADD_MOVIE, UPDATE_MOVIE, REMOVE_MOVIE } from '../../graphql/mutations';
import { GET_MOVIES } from '../../graphql/queries';

const fetchQueries = {
  refetchQueries: [{ query: GET_MOVIES }],
};

const Movies = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [movie, setMovie] = useState(null);
  const [addMovie] = useMutation(ADD_MOVIE, fetchQueries);
  const [updateMovie] = useMutation(UPDATE_MOVIE, fetchQueries);
  const [removeMovie] = useMutation(REMOVE_MOVIE, fetchQueries);

  const onToggleModal = () => setIsOpenModal(!isOpenModal);

  const handleEditMovie = (selectedMovie) => {
    setMovie(selectedMovie);
    onToggleModal();
  };

  const handleCloseModal = () => {
    onToggleModal();
    setMovie(null);
  };

  return (
    <Box>
      <Button
        variant="contained"
        size="large"
        onClick={handleCloseModal}
      >
        Add movie
      </Button>
      <MovieTable
        onEdit={handleEditMovie}
        onRemove={removeMovie}
      />
      {isOpenModal && (
        <MovieModal
          isOpen={isOpenModal}
          movie={movie}
          onClose={onToggleModal}
          onCreateOrUpdate={movie ? updateMovie : addMovie}
        />
      )}
    </Box>
  );
};

export default Movies;
