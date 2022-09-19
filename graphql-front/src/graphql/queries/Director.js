import { gql } from '@apollo/client';

export const GET_DIRECTORS = gql`
  query GetDirectors {
    directors {
      name
      id
    }
  }
`;
