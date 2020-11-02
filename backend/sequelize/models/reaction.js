module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define(
    'reaction',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    },
  );
  Reaction.associate = (m) => {
    Reaction.belongsTo(m.comment);
    Reaction.belongsTo(m.user);
  };
  return Reaction;
};
