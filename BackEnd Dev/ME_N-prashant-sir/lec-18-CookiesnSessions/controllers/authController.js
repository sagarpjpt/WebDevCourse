
exports.getLogin = (req, res) => {
  res.render("auth/login", { 
    pageTitle: "Login Page",
    currentPage: "Login",
    isLoggedIn: false
   });
}

exports.postLogin = (req, res) => {
  console.log(req.body);
  // res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  req.session.isLoggedIn = true;
  res.redirect("/");
}

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    return res.redirect("/login");
  });
}