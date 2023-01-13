const Location = `
  type Query {
    states: [State]
    locations: [Location]
  }
  type State {
      province: String
  }
  
  type Location {
      locationID: String!
      state: State
      county: String
      location: String
      latitude: Float
      longitude: Float,
  }
`;

export default Location;