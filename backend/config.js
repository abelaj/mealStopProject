const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config(); // Library to allow the importing of  enviromental variables in .env files

const url = process.env.DB_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));
