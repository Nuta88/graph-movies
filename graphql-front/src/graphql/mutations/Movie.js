import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation AddMovie($name: String, $genre: String, $directorId: ID) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      name,
      genre
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: ID, $name: String, $genre: String, $directorId: ID) {
    updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId) {
      name,
      genre
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation RemoveMovie($id: ID) {
    removeMovie(id: $id) {
      name,
      genre
    }
  }
`;
