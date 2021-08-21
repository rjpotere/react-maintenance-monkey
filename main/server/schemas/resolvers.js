const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id: _id });
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('A profile with this email does not exist');
            }

            const matchingPassword = await user.isCorrectPassword(password);

            if (!matchingPassword) {
                throw new AuthenticationError('Please check password');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { email, password }) => {
            const user = await User.create({ email, password });
            const token = signToken(user);

            return { token, user };
        },

        deleteUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }

            throw new AuthenticationError('Cannot delete this user')
        },
    },
};

module.exports = resolvers;