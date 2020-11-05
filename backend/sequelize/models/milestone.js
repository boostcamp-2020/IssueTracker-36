const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define(
    'milestone',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isClosed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    },
  );
  // Milestone.associate = (m) => {
  //   Milestone.hasMany(m.issue);
  // };
  return Milestone;
};
