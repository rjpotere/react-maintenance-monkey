const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID
    email: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(_id: ID!): User
}

type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteUser: User
}

`
module.exports = typeDefs;