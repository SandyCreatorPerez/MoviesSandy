const {body} = require("express-validator");
var path = require("path");

module.exports= {
    pelicula: [
        body("title")
            .notEmpty()
            .withMessage("Titulo requerido")
            .isLength({min:5, max :100})   
            .withMessage("El Titulo debe tener un Minimo de 5 y Maximo 100 caracteres"),

        body("rating")
            .notEmpty()
            .withMessage("Rating Requerido")
            .isNumeric()   
            .withMessage("Debe ser un Numero"),
        body("awards")
            .isNumeric()   
            .withMessage("Debe ser un Numero"),
        body("length")
            .notEmpty()
            .withMessage("Es necesario este dato")
            .isNumeric()   
            .withMessage("Debe ser un numero"),
        body("release_date")
            .notEmpty()
            .withMessage("La Fecha es necesaria")
            
    ]   

};