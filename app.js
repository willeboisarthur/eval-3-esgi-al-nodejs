const express = require("express");
const authRoute =require("./route/auth.route.js");
const userRoute =require("./route/user.route.js");
const postRoute = require("./route/post.route.js");
const Emotion = require('./model/emotion.model.js');
const {connect} = require('./model/connexion.js');
const sync = require('./model/sync.js');
const app = express();

const database = async () => {
    await connect();
    await sync();
}
database();

app.use(express.json());

app.use('/auth',authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);

module.exports = app;