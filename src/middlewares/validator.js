const {body} = require("express-validator");
var path = require("path");

module.exports= {
    pelicula: [
        body("title")
            .notEmpty()
            .withMessage("El titulo es obligatorio")
            .isLength({min:5, max :70})   
            .withMessage("El Titulo debe tener un Minimo de 5 y Maximo 70 caracteres"),

        body("rating")
            .notEmpty()
            .withMessage("El rating es obligatorio")
            .isNumeric()   
            .withMessage("El campo de Rating debe ser Numerico"),
        body("awards")
            .isNumeric()   
            .withMessage("El campo Premios debe ser Numerico"),
        body("length")
            .notEmpty()
            .withMessage("La Duracion es obligatoria")
            .isNumeric()   
            .withMessage("El campo Duracion de Pelicula debe ser Numerico"),
        body("release_date")
            .notEmpty()
            .withMessage("La Fecha es obligatoria")
            
    ]   

};