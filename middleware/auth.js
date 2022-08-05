module.exports = function(req, res, next) {
    
    if(!req.session.accessToken)
    {
        var err = new Error('Your session has expired!');
        err.status = 419;
        res.redirect(`/?error=${err}`) 
    }
    else
    {
        console.log('next')
        return next()
    }
    //return next()
}