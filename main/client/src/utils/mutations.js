import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password:$password) {
            token
            user {
                _id
                username
        }
    }
}
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_GARAGE = gql`
    mutation addToGarage($vehicleYear: String!, $vehicleMake: String!, $vehicleModel: String! ) {
        addToGarage(vehicleYear: $vehicleYear, vehicleMake: $make, vehicleModel: $vehicleModel) {
            _id
            vehicleYear
            vehicleMake
            vehicleModel
            createdAt
            maintenance {
                _id
                service
            }
        }
    }
`;

export const ADD_SERVICE = gql`
mutation addService($garageId: ID!, $service: String!, $serviceMileage: String, $serviceNote: String ) {
    addService(garageId: $garageId, service: $service, serviceMileage: $serviceMileage, serviceNote: $serviceNote) {
        _id
        year
        make
        vehicleModel
        createdAt
        newMaintenance {
            _id
            service
            serviceMileage
            serviceNote
            serviceDate
        }
    }
}
`;


//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     addToGarage(year: String!, make: String!, vehicleModel: String!): Garage
//     addService(garageId: ID!, service: String!, serviceMileage: String, serviceNote: String): Garage
//     deleteGarage(garageId: ID!): Garage
//     deleteService(garageId: ID!, serviceId: ID!): Garage
//     deleteUser: User
// }