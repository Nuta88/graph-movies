const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');
const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve: (source) => Directors.findById(source.directorId)
        },
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parents) => Movies.findById(parents.id)
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addMovie: {
            type: MovieType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                directorId: { type: GraphQLID }
            },
            resolve: (parents, args) => {
                const movie = new Movies({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                });
                return movie.save();
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                directorId: { type: GraphQLID }
            },
            resolve: (parents, args) => {
                const body = { name: args.name, genre: args.genre, directorId: args.directorId };

                return Movies.findByIdAndUpdate(args.id, { $set: body }, { new:true });
            }
        },
        removeMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parents, args) => Movies.findByIdAndDelete(args.id)
        }
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve: (parents, args) => Movies.findById(args.id)
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve: (parents, args) => Directors.findById(args.id)
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: () => Movies.find({})
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: () => Directors.find({})
        }
    })
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});