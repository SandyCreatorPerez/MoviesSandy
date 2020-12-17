const {Actor}= require("../database/models");
const {Op} = require('sequelize');

module.exports ={
    
    allact : async(req,res)=>{
        
        try{
            var titulo = "Listado de Actores";
            const actorjson = await Actor.findAll({
                order: [["id"]],
                
            });
            res.render("homeAct", {actores : actorjson,titulo : titulo});
            
        }catch(error){
            console.log(error);
        }
    },
    oneact : async(req,res)=>{
        
        try{
            const actorjson = await Actor.findByPk(req.params.id);
            res.render("detailAct", {actor : actorjson});
            
        }catch(error){
            console.log(error);
        }
    },
    newact : async(req,res)=>{
        var titulo = "Ultimos 5 Estrenos";
        try{
            
            const moviesjson = await Actor.findAll({
                order: [["release_date","DESC"]],
                limit: 5
            });
            
            res.render("home", {peliculas : moviesjson, titulo : titulo});
                       
        }catch(error){
            console.log(error);
        }
    },
    recomendadasact: async(req,res)=>{
        var titulo = "Peliculas Recomendadas";
        try{
            
            const moviesjson = await Actor.findAll({
                where:{
                    rating: { 
                        [Op.gte]: 8
                    }
                },
                order: [["title"]],
            });
            res.render('home',{peliculas:moviesjson, titulo : titulo});
       
        }catch(error){
            console.log(error);
        }
    },
    searchact : async(req,res)=>{
        var busqueda = req.body.keywords;
        
        try{
            var titulo = "Su Busqueda arrojo el siguiente resultado:";
            const moviesjson1 = await Actor.findAll({
                where: { [Op.or]:[
                    {first_name: { [Op.like]: ("%" + busqueda +"%") } },
                    {last_name: { [Op.like]: ("%" + busqueda +"%") } }
                ]
                },
                order: [["first_name"]],
            });
            
            res.render("homeAct", {actores : moviesjson1,titulo : titulo});
            
        }catch(error){
            console.log(error);
        }
    }
};