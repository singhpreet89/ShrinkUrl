const urlExist = require('url-exist');
const createError = require('http-errors');

// const verifyUrl = async (req, res, next) => {
//     try {
//         const exists = await urlExist(req.body.fullUrl);
        
//         if(exists) {
//             next();
//         } else {
//             throw createError(421, req.body.fullUrl + " is an Invalid Url");
//         }
//     } catch(error) {
//         next(error);
//     }
// }

const verifyUrl = (req, res, next) => {
    urlExist(req.body.fullUrl)
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

module.exports = verifyUrl;