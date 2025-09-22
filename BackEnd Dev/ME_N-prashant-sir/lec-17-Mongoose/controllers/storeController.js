const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/index", {
        registeredHomes: homes,
        pageTitle: "airbnb Home",
        currentPage: "index",
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
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("store/bookings", {
      registeredHomes: homes,
      pageTitle: "My Bookings",
      currentPage: "bookings",
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favs) => {
      const homes = favs.map((fav) => fav.houseId);
      res.render("store/favourite-list", {
        favouriteHomes: homes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    })
    .catch((err) => console.log("error", err));
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
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId }).then((fav) => {
    if (fav) {
      console.log("already marked favourite");
    } else {
      fav = new Favourite({ houseId: homeId });
      fav.save().then((result) => {
        console.log("fav added", result);
      });
    }
  }).catch((err) => {console.log(err)}).finally(() => {
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId})
    .then((result) => {
      console.log("fav added", result);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      res.redirect("/favourites");
    });
};
