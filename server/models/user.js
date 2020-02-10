'use strict';

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model { }
  
  User.init(
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        }
      }
    }
  );

  User.associate = function(models) {
    // associations can be defined here
  };
  
  return User;
};