const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    home: null,
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((homes) => {
    res.render("host/host-home-list", {
      registeredHomes: homes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );
  home
    .save()
    .then(() => {
      console.log("home added successfully");
      res.render("host/home-added", {
        pageTitle: "Home Added Successfully",
        currentPage: "Home Added",
      });
    })
    .catch((err) => {
      console.log("error while posting home", err);
    });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId; // reading path parameter
  const editing = req.query.editing === "true"; //reading query parameter & checking t or f

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      pageTitle: "Edit Your Home",
      currentPage: "host-homes",
      editing: editing,
      home: home,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
    id
  );
  home
    .save()
    .then(() => {
      console.log("home updated successfully");
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("error while editing", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to delete :", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("error while deleting file", err);
    });
};
