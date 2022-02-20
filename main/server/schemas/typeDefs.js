const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID
    email: String
    username: String
    vehicles: [Garage]!
}

type Garage {
    _id: ID
    vinNumber: String
    vehicleYear: String
    vehicleMake: String
    vehicleModel: String
    maintenance: [Services]!
}

type Services {
    _id: ID
    serviceType: String
    serviceMileage: String
    serviceNotes: String
    createdAt: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String): User
    vehicles(username: String): [Garage]
    service(garageId: ID!): Garage
    me: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addVehicle(vinNumber: String!, vehicleYear: String!, vehicleMake: String!, vehicleModel: String!): Garage
    addService(vehicleId: ID!, serviceType: String!, serviceMileage: String!, serviceNotes: String): Garage
    updateService(vehicleId: ID!, serviceId: ID!, serviceType: String!, serviceMileage: String!, serviceNotes: String): Garage
    removeVehicle(vehicleId: ID!): Garage
    removeService(vehicleId: ID!, serviceId: ID!): Garage
    deleteUser(userId:ID!): User
}

`;

module.exports = typeDefs;