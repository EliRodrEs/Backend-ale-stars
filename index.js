const PORT = process.env.PORT || 3000;

const express = require("express");
const { json } = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const config = require("./config");
const firebase = require("firebase")
const bearerToken = require("express-bearer-token");


const app = express();

firebase.initializeApp(config.firebaseConfig)

app.use(json());
app.use(cors());
app.use(bearerToken());

//Traemos las rutas de ficheros externos
const usersRoute = require('./routes/users')
const authRoute = require ('./routes/auth')
const beersRoute = require ('./routes/beers')

//enganchamos las rutas
app.use(usersRoute)
app.use(authRoute)
app.use(beersRoute)

app.get('/', (req, res) => {
  res.send('CERVEZAS READY')
})

async function connectDatabase() {
  let db = mongoose.connection;
  try {
      await mongoose.connect('mongodb+srv://EliRodres:alestars@ale-first-cluster-xpl7z.mongodb.net/test?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
  } catch (err) {
      console.log("Imposible conectar a la base de datos");
      console.log(err);
  }
}
async function init() {
  await connectDatabase();
  app.listen(PORT, () => console.log(`Conectado al puerto ${PORT}`));
}


init();
module.exports = app