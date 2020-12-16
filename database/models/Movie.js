module.exports = (sequelize,dataTypes)=> {

const Movie = sequelize.define('Movie', {
  // Model attributes are defined here

  id: {
    type: dataTypes.INTEGER,
    allowNull: false,
    primaryKey:true
  },
  awards: {
    type: dataTypes.TINYINT
    // allowNull defaults to true
  },
  title: {
    type: dataTypes.STRING
    // allowNull defaults to true
  },
  length:{
    type: dataTypes.DECIMAL
    // allowNull defaults to true
  },
  release_date:{
  type: dataTypes.STRING
    // allowNull defaults to true
  }

},
 {
  // Other model options go here
  timestamps: false,
  tableName: 'movies'
});

// `sequelize.define` also returns the model
return Movie;
}