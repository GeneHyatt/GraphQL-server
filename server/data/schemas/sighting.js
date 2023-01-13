
const Sighting = `
  type Query {
    sightings: [Sighting]
    sighting(id: ID): Sighting
    states: [State]
  }

  type State 
  {
    province: String 
  }

  type Sighting {
    ID: String
    commonName: String
    scientificName: String
    taxonomicOrder: Int
    count: Int
    county: String
    locationID: String
    location: String
    latitude: Float
    longitude: Float
    date: String
    time: String
    protocol: String
    duration: Int
    allObsReported: Int
    distanceTraveled: String
    areaCovered: String
    numberOfObservers: Int
    breedingCode: String
    observationDetails: String
    checklistComments: String
    mlCatalogNumbers: String
    state: State
  }
`;

export default Sighting;