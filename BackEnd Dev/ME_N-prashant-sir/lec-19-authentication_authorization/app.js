// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH =
  "mongodb+srv://root:password_123@clusterairbnb.2vv7oxe.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ClusterAirbnb";

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/error");
const authRouter = require("./routes/authRouter");
const { default: mongoose } = require("mongoose");

const app = express();
 
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

app.use(express.urlencoded());
app.use(session({
  // secret used to sign the session Id cookie and encrypt the session data
  secret: "lavnasur",
  // forces the session to be saved back to the session store, even if the session was never modified during the request
  resave: false,
  // forces a session that is "uninitialized" to be saved to the store
  saveUninitialized: true,
  // now all sessions are stored in mongoDB instead of server memory
  store: store,
}))
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next()
})
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  console.log("host middleware");
  if(req.isLoggedIn){
    next();
  } else{ 
    return res.redirect('/login');
  }
});
app.use("/host", hostRouter)


app.use(express.static(path.join(rootDir, "public")));
app.use(errorController.get404);

const PORT = 3000;


// first mongo connect then server will start
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("error while connecting to mongoDB", err));
