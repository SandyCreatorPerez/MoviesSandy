var express = require('express');
var router = express.Router();
const dbController = require('../controllers/dbController');
const validator = require('../middlewares/validator');
const db = require('../database/models');

/* Movies */ 
router.get("/",dbController.index);
router.get('/movies',dbController.listar); 
router.get("/movies/detail/:id",dbController.unaSola);
router.get("/movies/create",dbController.create);
router.post("/movies/create", validator.pelicula, dbController.almacenar);
router.get('/movies/recommended',dbController.recomendaciones);


router.get("/movies/edit/:id",dbController.editar);
router.put("/movies/edit/:id",validator.pelicula, dbController.cambios);
router.delete("/movies/delete/:id",dbController.eliminar);


router.get("/movies/new", dbController.nueva);
router.post("/movies/search",dbController.buscador);


module.exports = router;