import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      genre
      director {
        id
        name
        age
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($movieId: ID) {
    movie(id: $movieId) {
      id
      name
      genre
      director {
        name
        age
      }
    }
  }
`;
