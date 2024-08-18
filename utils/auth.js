const hasAuth = (req, res, next) => {
    console.log("REq Session Obj: ", req.session);
    // Using the incoming REQUEST --> session object
    // we are going to check is the USER AUTHORIZED
    if(!req.session.user_id) {
        // the USER is NOT AUTHORIZED
        res.redirect('/login');
    } else {
        // the USER IS AUTHORIZED
        next();  // --> we continue to PASS ALONG the INCOMING REQUEST
    }

}


module.exports = hasAuth;