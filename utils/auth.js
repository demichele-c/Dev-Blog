const hasAuth = (req, res, next) => {
    console.log("Req Session Obj: ", req.session);
    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = hasAuth;
