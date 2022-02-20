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
    updateService: async (parent, { vehicleId, serviceId, serviceType, serviceMileage, serviceNotes }, context) => {
      if(context.user) {
        return Garage.findOneAndUpdate(
          { _id: vehicleId },
          {
            $addToSet: {
              maintenance: { _id: serviceId, serviceType, serviceMileage, serviceNotes },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('To update service, please log in.');
    },
    removeVehicle: async (parent, { vehicleId }, context) => {
      if (context.user) {
        const vehicle = await Garage.findOneAndDelete({
          _id: vehicleId
        });

        await User.findOneAndUpdate(
          { _id: vehicleId },
          { $pull: { vehicles: vehicle._id } }
        );
      }
      throw new AuthenticationError('To remove a vehicle, please log in.');
    },
    removeService: async (parent, { vehicleId, serviceId }, context) => {
      if (context.user) {
        return Garage.findOneAndUpdate(
          { _id: vehicleId },
          {
            $pull: {
              maintenance: {
                _id: serviceId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('To remove a service performed, please log in.');
    },
    deleteUser: async (parent, { userId }, context) => {
      return User.findOneAndDelete({ _id: userId });
    },
  },

};

module.exports = resolvers;