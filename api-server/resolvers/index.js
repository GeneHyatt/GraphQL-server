// TODO: move these to utils
const uniqueValues = (array, propertyName) => {
  return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
}


// TODO: move the different specific resolvers to their own files.
const resolvers = {
  Query: {
    birds: (obj, args, context) => {
      return Promise.resolve(uniqueValues(context.sightings, 'commonName'));

    },
    // birds: (obj, args, context) => {
    //   console.log('birds', context.sightings);
    //   // console.log('context', context);
    //   const birdArray = context.sightings.map((item) => {
    //     return {
    //       commonName: item.commonName,
    //       scientificName: item.scientificName,
    //       taxonomicOrder: item.taxonomicOrder
    //     };
    //   });
    //   return Promise.resolve(birdArray);
    // },
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
            locationID: item.locationID,
            location: item.location,
            locationDetails: {
              county: item.county,
              latitude: item.latitude,
              longitude: item.longitude
            }
          };
        },
      );
      return Promise.resolve(locationArray);
    },
    counties: (obj, args, context) => {
      console.log('countyArray', uniqueValues(context.sightings, 'country'))
      return Promise.resolve(uniqueValues(context.sightings, 'country'));
    },
    states: (obj, args, context) => {
      const stateObjArray = uniqueValues(context.sightings, 'state');
      const provinceArray = uniqueValues(stateObjArray, 'province');
      // console.log('stateObjArray', stateObjArray);
      console.log('provinceArray', provinceArray);
      // console.log('stateArray', uniqueValues(context.sightings, 'state'))
      return Promise.resolve(stateObjArray);
    },
  },
};

export default resolvers;