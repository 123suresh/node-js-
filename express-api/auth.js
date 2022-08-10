function auth(req, res, next){
    console.log("Athenticating ..... ");
    next();
}

module.exports = auth;