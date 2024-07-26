const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

dotenv.config({ path: __dirname + '/../.env' });

const webapp = express();

webapp.use('/public', express.static('src/assets'));

webapp.use(express.json());

webapp.get('/', (req, res) => {
  res.send(
    "<h1 style='color: red'>Hello world<img src='/public/img/logo.png' /></h1>"
  );
});

webapp.use('/api', userRoutes);
webapp.use('/api', articleRoutes);

webapp.listen(process.env.PORT, () => {
  console.log(`Running on: http://localhost:${process.env.PORT}`);
});
