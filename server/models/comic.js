'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Comic extends Model { }
  
  Comic.init(
    {
      title: {
        type: DataTypes.STRING
      },
      author: {
        type: DataTypes.STRING
      },
      imageUrl: {
        type: DataTypes.STRING
      }
    },
    { sequelize }
  );

  Comic.associate = function(models) {
    // associations can be defined here
  };
  
  return Comic;
};