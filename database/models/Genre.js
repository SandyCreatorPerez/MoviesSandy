const {sequelize,DataTypes}= require("sequelize");

module.exports =(sequelize,DataTypes)=>{
    const Genre = sequelize.define("Genre",{

        name : DataTypes.STRING,

        ranking : DataTypes.DECIMAL,
        
        active : DataTypes.INTEGER,
        
    })
    Genre.associate = (models =>{
      Genre.hasMany(models.Movie);
    })
    return Genre;
}