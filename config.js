let envs = {}
if(process.env.NODE_ENV !=="production"){
	const dotenv = require("dotenv");
	const result = dotenv.config();
	envs = result.parsed
}
if(process.env.NODE_ENV === "production"){
  envs = process.env
}
const firebaseConfig = {
  
  apiKey: envs.FIREBASE_API_KEY,
  authDomain: envs.FIREBASE_AUTH_DOMAIN,
  databaseURL: envs.FIREBASE_DATABASE_URL,
  projectId: envs.FIREBASE_PROJECT_ID,
  storageBucket: envs.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envs.FIREBASE_MESSAGING_SENDER_ID,
  appId: envs.FIREBASE_APP_ID ,
  measurementId: envs.FIREBASE_MEASUREMENT_ID
};

const mongoConfig =  envs.MONGO_DB_URL;
const jwtKey = envs.JWT_PASSWORD

const config = {
	firebaseConfig,
  mongoConfig,
  jwtKey
}


module.exports = config;  