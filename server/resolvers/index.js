// TODO: move the different specific resolvers to their own files.
const resolvers = {
  Query: {
    sightings: (obj, args, context) => {
      return context.sightings;
    },
    sighting: (obj, args, context) => {
      const data = context.sightings.find(element => element.ID === args.id);
      return Promise.resolve(data);
    },
    locations: (obj, args, context) => {
      const locationArray = context.sightings.map((item) => {
          return {
            county: item.county,
            location: item.location,
            latitude: item.latitude,
            longitude: item.longitude,
          };
        },
      );
      return Promise.resolve(locationArray);
    },
  },
};

export default resolvers;