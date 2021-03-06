/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Apps = sequelize.define('Apps', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    tableName: 'apps'
  });

  return Apps
};
