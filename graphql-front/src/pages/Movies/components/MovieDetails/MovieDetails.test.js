import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import MovieDetails from './index';

import { GET_MOVIE } from '../../../../graphql/queries';

const mocks = [
  {
    request: {
      query: GET_MOVIE,
      variables: { movieId: '2' },
    },
    result: {
      data: {
        movie: {
          id: '2',
          name: 'Buck',
          genre: 'Horror',
          director: { name: 'DirTestName', age: 56 },
        },
      },
    },
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '2',
  }),
}));

test('renders Movie details component', () => {
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}>
      <MovieDetails />
    </MockedProvider>
  );
  expect(screen.getByTestId('movie-detail-card')).toBeInTheDocument();
});
