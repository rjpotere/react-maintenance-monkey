const { AuthenticationError } = require('apollo-server-express');
const { User, Garage } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('vehicles');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('vehicles');
    },
    vehicles: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Garage.find(params);
    },
    service: async (parent, { serviceId }) => {
      return Garage.findOne({ _id: serviceId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('vehicles');
      }
      throw new AuthenticationError('You must be logged in.');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Please check your email');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Please check your password');
      }

      const token = signToken(user);

      return { token, user };

    },
    addVehicle: async (parent, { vinNumber, vehicleYear, vehicleMake, vehicleModel }, context) => {
      if (context.user) {
        const garage = await Garage.create({
          vinNumber,
          vehicleYear,
          vehicleMake,
          vehicleModel,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { vehicles: garage._id } }
        );

        return garage;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addService: async (parent, { vehicleId, serviceType, serviceMileage, serviceNotes }, context) => {
      if(context.user) {
        return Garage.findOneAndUpdate(
          { _id: vehicleId },
          {
            $addToSet: {
              maintenance: { serviceType, serviceMileage, serviceNotes },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('To add service, please log in.');
    },
  },

};

module.exports = resolvers;