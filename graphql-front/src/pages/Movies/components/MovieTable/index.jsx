import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { GET_MOVIES } from '../../../../graphql/queries';


const MovieTable = ({ onEdit, onRemove }) => {
    const { loading ,data: { movies } = {} } = useQuery(GET_MOVIES);

    const handleRemoveMovie = id => {
        onRemove({ variables: { id } });
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Genre</TableCell>
                        <TableCell align="right">Director</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!loading && movies?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`/movie/${row.id}`}>{row.name}</Link>
                            </TableCell>
                            <TableCell align="right">{row.genre}</TableCell>
                            <TableCell align="right">{row.director?.name}</TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <IconButton aria-label="delete" onClick={() => handleRemoveMovie(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={() => onEdit(row)}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default MovieTable;