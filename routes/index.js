const express = require('express');
const router = express.Router();

router.use('/dispositivo', require('./dispositivos'));
router.use('/localizacao', require('./localizacao'));

module.exports = router;
