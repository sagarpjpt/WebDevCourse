const Home = require('../models/home')

exports.getIndex = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  })
}

exports.getHomes = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/home-list", {
      registeredHomes: homes,
      pageTitle: "Home List",
      currentPage: "Home",
    })
  })
}

exports.getBookings = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>{
    res.render("store/bookings",{
      registeredHomes: registeredHomes,
      pageTitle: "My Bookings",
      currentPage: "bookings"
    })
  })
}

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>{
    res.render("store/favourite-list",{
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites"
    })
  })
}