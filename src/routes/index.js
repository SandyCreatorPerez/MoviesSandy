var express = require('express');
var router = express.Router();
const dbController = require('../controllers/dbController');


router.get("/",dbController.index);

router.get('/movies',dbController.listar); 

router.get("/movies/detail/:id",dbController.unaSola);

router.get("/movies/new", dbController.loUltimo);

router.get('/movies/recommended',dbController.recomendaciones);

router.post("/movies/search",dbController.buscando);

router.get("/movies/create",dbController.creando);

router.post("/movies/create", validator.pelicula, dbController.guardando);

router.get("/movies/edit/:id",dbController.actualizando);

router.put("/movies/edit/:id",validator.pelicula, dbController.cambiando);

router.delete("/movies/delete/:id",dbController.borrar);



module.exports = router;