var express = require('express');
var router = express.Router();
const dbController = require('../controllers/dbController');

router.get("/",dbController.index);

router.get('/movies',dbController.listar); 

router.get("/movies/detail/:id",dbController.unaSola);

router.get("/movies/new", dbController.loUltimo);

router.get('/movies/recommended',dbController.recomendaciones);

router.post("/movies/search",dbController.buscando);

router.get("/movies/create",dbController.nueva);




//router.get("/movies/edit/:id",dbController.editar);
//router.delete("/movies/delete/:id",dbController.eliminar);





module.exports = router;