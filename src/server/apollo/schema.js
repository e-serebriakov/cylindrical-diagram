module.exports = `
  type Query {
    statistics: [StatisticsType]!
  }

  type StatisticsType {
    id: ID!
    value: Int!
    topSign: String!
    bottomSign: String!
  }
  
  schema {
    query: Query
  }
`;
