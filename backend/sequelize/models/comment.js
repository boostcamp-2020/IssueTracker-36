module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    },
  );
  Comment.associate = (m) => {
    Comment.belongsTo(m.user);
    Comment.belongsTo(m.issue);
    Comment.hasMany(m.reaction);
  };
  return Comment;
};
