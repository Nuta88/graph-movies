import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Movies from '../pages/Movies';
import MovieDetails from '../pages/Movies/components/MovieDetails';

const AppRouters = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<Movies />}
      />
      <Route
        path="/movie/:id"
        element={<MovieDetails />}
      />
    </Routes>
  </BrowserRouter>
);

export default AppRouters;
