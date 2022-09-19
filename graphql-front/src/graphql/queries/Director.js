import { gql } from '@apollo/client';

export const GET_DIRECTORS = gql`
  query GetDirectors {
    directors {
      name
      id
    }
  }
`;

export const GET_DIRECTOR = gql`
  query GetDirector($directorId: ID) {
    director(id: $directorId) {
      id
      name
    }
  }
`;
