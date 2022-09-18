import { useFormik } from 'formik';
import { useQuery } from '@apollo/client';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';

import { Select } from '../../../../components/Form';
import { GET_DIRECTORS } from '../../../../graphql/queries';

const MovieModal = ({ isOpen, movie, onClose, onCreateOrUpdate }) => {
    const title = movie ? `Update ${movie?.name} movie` : 'Add new movie';
    const { data: { directors } = {} } = useQuery(GET_DIRECTORS);

    const formik = useFormik({
        initialValues: {
            name: movie?.name ?? '',
            genre: movie?.genre ?? '',
            directorId: movie ? movie.director?.id : ''
        },
        onSubmit: (values, { resetForm }) => {
            const variables = movie ? { id: movie.id, ...values } : values;

            onCreateOrUpdate({ variables }).then(() => {
                resetForm();
                onClose();
            })
        },
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    return (
      <Dialog onClose={handleClose} open={isOpen}>
          <DialogTitle>{title}</DialogTitle>
          <Box sx={{margin: '0 10px 16px'}}>
              <form onSubmit={formik.handleSubmit}>
                  <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      variant="standard"
                      sx={{marginBottom: '10px'}}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                      fullWidth
                      id="movie-genre"
                      name="genre"
                      label="Genre"
                      variant="standard"
                      sx={{marginBottom: '10px'}}
                      value={formik.values.genre}
                      onChange={formik.handleChange}
                      error={formik.touched.genre && Boolean(formik.errors.genre)}
                      helperText={formik.touched.genre && formik.errors.genre}
                  />
                  <Select
                      fullWidth
                      label="Director"
                      name="directorId"
                      variant="standard"
                      sx={{marginBottom: '10px'}}
                      value={formik.values.directorId}
                      options={directors || []}
                      onSelect={formik.handleChange}
                      error={formik.touched.genre && Boolean(formik.errors.genre)}
                      helperText={formik.touched.genre && formik.errors.genre}
                  />
                  <Button type="submit">Submit</Button>
                  <Button onClick={handleClose}>Cancel</Button>
              </form>
          </Box>
      </Dialog>
  )
};

export default MovieModal;