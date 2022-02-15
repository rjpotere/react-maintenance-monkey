const { AuthenticationError } = require("apollo-server-express");
const { User, Garage } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("userGarage");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("userGarage");
    },
    userGarage: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Garage.find(params).sort({ createdAt: -1 });
    },
    service: async (parent, { garageId }) => {
      return Garage.findOne({ _id: garageId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("userGarage");
      }
      throw new AuthenticationError("You are not logged in.");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "A profile with this email does not exist"
        );
      }

      const matchingPassword = await user.isCorrectPassword(password);

      if (!matchingPassword) {
        throw new AuthenticationError("Please check password");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    addToGarage: async (parent, { year, make, vehicleModel }, context) => {
      if (context.user) {
        const newgarage = await Garage.create({
          year,
          make,
          vehicleModel,
        });

        await User.findOneAndUpdate(
          { _id: context.user.id },
          { $addToSet: { userGarage: newgarage._id } }
        );

        return newgarage;
      }
      throw new AuthenticationError("You are not logged in.");
    },

    addService: async (
      parent,
      { garageId, service, serviceMileage, serviceNote },
      context
    ) => {
      if (context.user) {
        return Garage.findOneAndUpdate(
          { _id: garageId },
          {
            $addToSet: {
              maintenance: { service, serviceMileage, serviceNote },
            },
          },
          {
              new: true,
              runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You are not logged in.')
    },

    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }

      throw new AuthenticationError("Cannot delete this user");
    },
  },
};

module.exports = resolvers;
