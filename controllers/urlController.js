const Url = require('../services/Url');
const Database = require('../services/Database');

/**
 * @description Generate a URL Short
 */
exports.generateURL = (req, res, next) => {
    const url = req.body.url; 
    res.json({url});
}

exports.redirectURL = (req, res, next) => {
    const url = req.params.urlID
    res.json({url});
}

exports.show = (req, res, next) => {
    res.render('index')
}