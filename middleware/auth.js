// Make user available to all views
function setUserLocals(req, res, next) {
    res.locals.user = req.session.user || null;
    next();
}

// Protect routes - require authentication
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// we redirect if already logged in
function requireGuest(req, res, next) {
    if (req.session && req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
}

module.exports = {
    setUserLocals,
    requireAuth,
    requireGuest
};
