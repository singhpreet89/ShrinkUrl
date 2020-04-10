const urlExist = require('url-exist');
const createError = require('http-errors');
const urlParser = require('url');

/* Promise */
const verifyUrl = (req, res, next) => {
    const verifiedFullUrl = verifyHttpProtocol(req.body.fullUrl);

    urlExist(verifiedFullUrl)
        .then((exists) => {
            if(exists) {
                next();
            } else {
                throw createError(421, req.body.fullUrl + " is an Invalid Url");
            }
        })
        .catch((error) => {
            next(error);
        })
    ;
}

/* ASYNC / AWAIT */
// const verifyUrl = async (req, res, next) => {
//     const verifiedFullUrl = verifyHttpProtocol(req.body.fullUrl);

//     try {
//         const exists = await urlExist(verifiedFullUrl);
        
//         if(exists) {
//             next();
//         } else {
//             throw createError(421, req.body.fullUrl + " is an Invalid Url");
//         }
//     } catch(error) {
//         next(error);
//     }
// }

// If the user does not provide the Protocol then add "https://" to make sure tha the urlExist() gets the correct type of URL
const verifyHttpProtocol = (url) => {
    let verifiedUrl = null;
    
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        verifiedUrl = "http://" + url;
    } else {
        verifiedUrl = url;
    }

    verifiedUrl = urlParser.parse(verifiedUrl, true);
    return verifiedUrl.protocol + "//" + verifiedUrl.host;
}

module.exports = verifyUrl;