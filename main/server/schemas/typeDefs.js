const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID
    email: String
    userGarage: [Garage]!
}

type Garage {
    _id: ID
    year: String
    make: String
    vehicleModel: String
    maintenance: [Maintenance]
}

type Maintenance {
    _id: ID
    service: String
    serviceMileage: String
    serviceNote: String
    serviceDate: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    userGarage(username: String): [Garage]
    service(garageId: ID!): Garage
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToGarage(year: String!, make: String!, vehicleModel: String!): Garage
    addService(garageId: ID!, service: String!, serviceMileage: String, serviceNote: String): Garage
    deleteGarage(garageId: ID!): Garage
    deleteService(garageId: ID!, serviceId: ID!): Garage
    deleteUser: User
}

`;

module.exports = typeDefs;