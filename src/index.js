const express = require('express');
const cors = require('cors');
const db = require('./services/databaseService');
const { port } = require('./config');
const validationErrorMiddleware = require('./middlewares/validationError');
const routes = require('./routes');

db.init();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validationErrorMiddleware);
app.use(routes);

app.listen(port, () => {
  console.log(`Server runnig in port: ${port}`);
});
