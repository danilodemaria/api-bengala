const express = require('express');
const cors = require('./config/cors');
require('./models');
const app = express();
app.use(cors);
app.use(express.json());
app.use('/api', require('./routes'));
const logger = require('./utils/logger');

app.listen(6000, () => {
  logger.info('SERVIDOR ONLINE');
  logger.info('Aguardando requisições em: https://michaeldouglas.burrow.link');
});
