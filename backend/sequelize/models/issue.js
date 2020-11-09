module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    'issue',
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
  Issue.associate = (m) => {
    Issue.hasMany(m.issue_label);
    Issue.hasMany(m.user_issue);
    Issue.hasMany(m.comment);
    Issue.belongsTo(m.milestone);
  };
  return Issue;
};
