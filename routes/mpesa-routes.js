
const express = require('express');
const { mpesaPassword,token,stkPush } = require('../controllers/mpesaController');
const router = express.Router();



router.get('/password',mpesaPassword);

router.post('/stkpush',token,stkPush);


module.exports = {
    routes:router
}