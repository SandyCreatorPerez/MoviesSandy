const {Movie} = require("../../database/models");
const {Op} = require('sequelize');
const {validationResult} = require ("express-validator");


module.exports ={
    index: async(req,res)=>{
        res.render("index");
    },
    listar : async(req,res)=>{
        try{
            var titulo = "Listado Peliculas";
            const moviesjson = await Movie.findAll({
                order: [["id"]],
                
            });
            res.render("listado", {peliculas : moviesjson,titulo : titulo});
            
        }catch(error){
            console.log(error);
        }}, 
    unaSola : async(req,res)=>{
            try{
                const moviesjson = await Movie.findByPk(req.params.id,{include:{all:true}});
                res.render("pelicula", {pelicula : moviesjson});
                
            }catch(error){
                console.log(error);
            }
        },
    loUltimo : async(req,res)=>{
            var titulo = "Peliculas mas Recientes";
            try{
                const moviesjson = await Movie.findAll({
                    order: [["release_date","DESC"]],
                    limit: 5
                });
                res.render("listado", {peliculas : moviesjson, titulo : titulo});
                
                
            }catch(error){
                console.log(error);
            }
        },
    recomendaciones: async(req,res)=>{
            var titulo = "Lo mas Recomendado";
            try{
                 const moviesjson = await Movie.findAll({
                    where:{
                        rating: { 
                            [Op.gte]: 8
                        }
                    },
                    order: [["title"]],
                });
                res.render('listado',{peliculas:moviesjson, titulo : titulo});
           
            }catch(error){
                console.log(error);
            }
    },
    buscando : async(req,res)=>{
        var busquedadepeliculas = req.body.keywords;
        try{
            var titulo = "Resultado de la busqueda:";
            const moviesjson1 = await Movie.findAll({
                where: { title: { [Op.like]: ("%" + busquedadepeliculas +"%") } },
                order: [["title"]],
            });
            
            res.render("listado", {peliculas : moviesjson1,titulo : titulo});
            
        }catch(error){
            console.log(error);
        }
    }}