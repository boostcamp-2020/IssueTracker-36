module.exports = (sequelize, DataTypes) => {
  const UserIssue = sequelize.define(
    'user_issue',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      isOwner: {
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

  UserIssue.associate = (m) => {
    UserIssue.belongsTo(m.user);
    UserIssue.belongsTo(m.issue);
  };
  return UserIssue;
};
