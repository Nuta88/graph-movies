import { InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        launches: {
          keyArgs: false,
          merge(existing, incoming) {
            let launches = [];
            if (existing?.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming?.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          },
        },
      },
    },
  },
});

export default cache;
