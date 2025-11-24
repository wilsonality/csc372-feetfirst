async function home(req, res) {
    if (req.session && req.session.user){
        // if user logged in, show them their home
        res.render("home", {title: "Home"});
    }
    else{
        // if user not logged in, show them the home page
        res.render("home", {title: "Home"});
    }
}

async function loginPage(req, res){
    res.render("user/user-login", {title: "Login to Feet First"});
}

module.exports = {
    home,
    loginPage
}