const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    years_life: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};
