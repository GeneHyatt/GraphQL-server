const Location = `
  type Query {
    states: [State]
    locations: [Location]
    counties: [County]
    locationDetails: [LocationDetails]
  }
  
  type County {
    county: String
  }

  type State {
      province: String
  }
  
  type Location {
    locationID: String!
    location: String
    locationDetails: LocationDetails
  }
  
  type LocationDetails {
      locationID: String!
      state: State
      county: String
      address: String
      latitude: Float
      longitude: Float,
  }
`;

export default Location;