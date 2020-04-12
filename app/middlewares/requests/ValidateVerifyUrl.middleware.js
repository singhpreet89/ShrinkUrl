const urlExist = require('url-exist');
const createError = require('http-errors');
const urlParser = require('url');

/* THIS MODULE VERIFIES if an actual url is passed and then VALIDATES WHETHER THE Url(WEBSITE) IS ONLINE */
/* Promise */
const validateVerifyUrl = (req, res, next) => {
    const verifiedUrl = verifyHttpProtocol(req.body.fullUrl);

    // Verify the URL when it is a http or https link
    if(verifiedUrl.protocol === 'http:' || verifiedUrl.protocol === 'https:') {
        const verifiedFullUrl = verifiedUrl.protocol + "//" + verifiedUrl.host;
        
        urlExist(verifiedFullUrl)
            .then((exists) => {
                if(exists) {
                    next();
                } else {
                    throw createError(400, "Url does not exist on the Web");
                }
            })
            .catch((error) => {
                next(error);
            })
        ;
    } else if(verifiedUrl.protocol === 'ftp:') {
        next();
    } else {
        next(createError(400, "Url Protocol not supported"));
    }
}

// If the user does not provide the Protocol then add "https://" to make sure tha the urlExist() gets the correct type of URL
const verifyHttpProtocol = (url) => {
    let verifiedUrl = null;
    
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        verifiedUrl = "http://" + url;
    } else {
        verifiedUrl = url;
    }

    verifiedUrl = urlParser.parse(verifiedUrl, true);
    return verifiedUrl;
}

module.exports = validateVerifyUrl;