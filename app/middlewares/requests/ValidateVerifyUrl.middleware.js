const urlExist = require('url-exist');
const createError = require('http-errors');
const urlParser = require('url');

/* THIS MODULE VERIFIES if an actual url is passed and thenVALIDATES WHETHER THE Url(WEBSITE) IS ONLINE */
/* Promise */
const validateVerifyUrl = (req, res, next) => {
    const verifiedFullUrl = verifyHttpProtocol(req.body.fullUrl);
    
    urlExist(verifiedFullUrl)
        .then((exists) => {
            if(exists) {
                next();
            } else {
                throw createError(400, "Bad request");
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
//             throw createError(400, "Bad request");
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

module.exports = validateVerifyUrl;