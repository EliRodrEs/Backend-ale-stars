let envs = {}
if(process.env.NODE_ENV !=="production"){
	const dotenv = require("dotenv");
	const result = dotenv.config();
	envs = result.parsed
}

const firebaseConfig = {
  
  apiKey: "AIzaSyA495aZWH14wxBpj_rmwFW1K9rUimWu8Q4",
  authDomain: "ale-stars.firebaseapp.com",
  databaseURL: "https://ale-stars.firebaseio.com",
  projectId: "ale-stars",
  storageBucket: "ale-stars.appspot.com",
  messagingSenderId: "807249069911",
  appId: "1:807249069911:web:f53667889ffef53661a012",
  measurementId: "G-W7D48H3Q76"


  /* apiKey: process.env.FIREBASE_API_KEY || envs.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN || envs.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL || envs.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID || envs.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || envs.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || envs.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID || envs.FIREBASE_APP_ID */
};

const mongoConfig = process.env.MONGO_DB_URL || envs.MONGO_DB_URL;
const jwtKey = process.env.JWT_PASSWORD || envs.JWT_PASSWORD

const config = {
	firebaseConfig,
  mongoConfig,
  jwtKey
}


module.exports = config;