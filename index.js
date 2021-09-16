const express = require('express');
const cors = require('./config/cors');
require('./models');
const app = express();
app.use(cors);
app.use(express.json());
app.use('/api', require('./routes'));

app.listen(3000, () => {
  console.log(
    `Servidor online na porta: ${3000}\nAguardando requisições em: http://localhost:3000/api`
  );
});
