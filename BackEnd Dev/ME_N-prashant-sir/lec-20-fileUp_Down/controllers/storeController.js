const Home = require("../models/home");
const User = require("../models/user");

const path = require("path");
const rootDir = require("../utils/pathUtil");

exports.getIndex = (req, res, next) => {
  console.log(req.session, req.session.isLoggedIn);
  Home.find()
    .then((homes) => {
      res.render("store/index", {
        registeredHomes: homes,
        pageTitle: "airbnb Home",
        currentPage: "index",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => console.log("error", err));
};

exports.getHomes = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/home-list", {
      registeredHomes: homes,
      pageTitle: "Home List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/bookings", {
      registeredHomes: homes,
      pageTitle: "My Bookings",
      currentPage: "bookings",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findById(homeId)
    .then((home) => {
      console.log("home details found", home);
      if (!home) {
        res.redirect("/homes");
        console.log("home not found");
      } else {
        res.render("store/home-detail", {
          home: home,
          pageTitle: "Home Detail",
          currentPage: "Home",
          isLoggedIn: req.isLoggedIn,
          user: req.session.user,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  console.log("user with favs", user);
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(
      (favId) => favId.toString() !== homeId
    );
    await user.save();
  }
  res.redirect("/favourites");
};

exports.getHouseRules = [
  (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.redirect("/login");
    }
    next();
  },

  (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("house rule for home id:", homeId);
    // house specific rules file --->
    // const rulesFileName = `House-Rules-${homeId}.pdf` 
    // use it when rule file uploaded by host ---> save uploaded pdf in above naming format using multer
    const rulesFileName = `House-Rules.pdf`;
    const filePath = path.join(rootDir, "rules", rulesFileName);
    res.download(filePath, "Rules.pdf");
  },
];
