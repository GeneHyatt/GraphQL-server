export const Query = {
  sightings: (obj, args, context, info) => {
    return context.sightings
  },
  sighting: (_, args, context) => {
    const data = context.sightings.find(element => element.ID === args.id);
    return Promise.resolve(data)
  }
}