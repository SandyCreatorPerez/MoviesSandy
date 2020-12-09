const {Movie}= require("../database/models");
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
        }
    },
    unaSola : async(req,res)=>{
        try{
            const moviesjson = await Movie.findByPk(req.params.id,{include:{all:true}});
            res.render("pelicula", {pelicula : moviesjson});
            
        }catch(error){
            console.log(error);
        }
    },
    nueva : async(req,res)=>{
        var titulo = "Ultimos Estrenos";
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
        var titulo = "Recomendados";
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
    create:async(req,res)=>{
        try{
            const generos = await Genre.findAll();
            const actores = await Actor.findAll();
            
            res.render ('nuevaPeli',{generos, actores});

        }catch(error){
            console.log(error);
        }
    },
    almacenar:async(req,res)=>{
        
        const resultado = validationResult(req);
        
        if(resultado.isEmpty()){
            const newMovie = await Movie.create(req.body)
            await newMovie.addActores(req.body.actores)
            
            res.redirect('/movies')
        }else{
            res.render("cambios",{errors: resultado.errors});
        }
    },
    editar : async(req,res)=>{
        try{
            const movie = await Movie.findByPk(req.params.id,{include :["Genre","actores"]});
            const generos = await Genre.findAll();
            const actores = await Actor.findAll();
            res.render('edit_movie',{peliculas:movie});
            
        }catch(error){
            console.log(error);
        }
    },

    cambios : async(req,res)=>{
        try{
            const resultado = validationResult(req);
            if(resultado.isEmpty()){
                const changedMovie = await Movie.findByPk(req.params.id,{include :["Genre","actores"]});
                await changedMovie.removeActores(changedMovie.actores);
                await changedMovie.addActores(req.body.actores);
                await changedMovie.update(req.body);
                res.redirect("/movies");
            }else{
                res.render("cambios",{errors: resultado.errors});
            }
            
        }catch(error){
            console.log(error);
        }
    },
    eliminar : async(req,res)=>{
        try{
            const toDelete = await Movie.findByPk(req.params.id, {include :["Genre","actores"]});
            await toDelete.removeActores(toDelete.actores);
            await toDelete.destroy();
            res.redirect("/movies"); 
            
        }catch(error){
            console.log(error);
        }
    },

    buscador : async(req,res)=>{
        var busqueda = req.body.keywords;
        try{
            var titulo = "El resultado:";
            const moviesjson1 = await Movie.findAll({
                where: { title: { [Op.like]: ("%" + busqueda +"%") } },
                order: [["title"]],
            });
            
            res.render("listado", {peliculas : moviesjson1,titulo : titulo});
            
        }catch(error){
            console.log(error);
        }
    }
}