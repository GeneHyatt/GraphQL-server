const Bird = `
  type Query {
    birds: [Bird]
  }

  type Bird {
      commonName: String
      scientificName: String
      taxonomicOrder: Int!
  }
`;

export default Bird;
