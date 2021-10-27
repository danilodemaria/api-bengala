const express = require('express');
const router = express.Router();

router.use('/dispositivo', require('./dispositivos'));
router.use('/localizacao', require('./localizacao'));
router.get('/', async (req, res, next) => {
  return res.status(200).send({ message: 'SERVER ONLINE' });
});

module.exports = router;
