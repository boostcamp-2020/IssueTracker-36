module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define(
    'label',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      color: {
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
  Label.associate = (m) => {
    Label.hasMany(m.issue_label);
  };
  return Label;
};
