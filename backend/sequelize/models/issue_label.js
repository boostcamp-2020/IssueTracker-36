module.exports = (sequelize, DataTypes) => {
  const IssueLabel = sequelize.define(
    'issue_label',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    },
  );

  IssueLabel.associate = (m) => {
    IssueLabel.belongsTo(m.label);
    IssueLabel.belongsTo(m.issue);
  };
  return IssueLabel;
};
