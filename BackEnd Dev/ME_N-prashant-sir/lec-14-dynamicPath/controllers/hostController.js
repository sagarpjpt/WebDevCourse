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
  Home.fetchAll((homes) => {
    res.render("host/host-home-list", {
      registeredHomes: homes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "Home Added",
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId; // reading path parameter
  const editing = req.query.editing === "true"; //reading query parameter & checking t or f

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      pageTitle: "Edit Your Home",
      currentPage: "host-homes",
      editing: editing,
      home: home
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();
  res.redirect("/host/host-home-list");
}

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('came to delete :', homeId);
  Home.deleteById(homeId, err => {
    if(err) { console.log('error while deleting file', err) }
    res.redirect('/host/host-home-list');
  })
}