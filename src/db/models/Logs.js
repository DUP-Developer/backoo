/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Logs = sequelize.define('Logs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING(224),
      allowNull: true
    }
  }, {
    tableName: 'logs'
  });

  Logs.associate = models => {
    Logs.belongsTo(models.Apps, {
      foreignKey: 'app_id'
    })
  }

  return Logs
};
