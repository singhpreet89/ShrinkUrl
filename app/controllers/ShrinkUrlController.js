const ShrinkUrl = require('../models/ShrinkUrl'); 

/***************************************** (GET) all url's *****************************************/
/* Promise */
exports.get_all_urls = (req, res) => {
    ShrinkUrl.find()
        .then((urls) => {
            res.status(200).json(urls);
        }).catch((err) => {
            res.status(404).json({error : "Access Error"})
        })
    ;
}

/* ASYNC / AWAIT */
// exports.get_all_urls =  async (req, res) => {
//     try {
//         const urls = await ShrinkUrl.find()
//         res.status(200).json(urls);
//     } catch(err) {
//         res.status(404).json({error : "Access Error"});
//     }
// }

/***************************************** (GET) one url *****************************************/
/* Promise */
exports.get_single_url = (req, res) => {
    ShrinkUrl.findOne({ short_url : req.params.shortUrl })
        .then((data) => {
            if(data === null) {
                res.status(404);
            }
            data.clicks++;
            data.save();
    
            res.status(200).json(data.url);
        }).catch((err) => {
            res.status(404).json({error : "Not Found"});
        })
    ;
}

/* ASYNC / AWAIT */
// exports.get_single_url = async (req, res) => {
//     try {
//         const data = await ShrinkUrl.findOne({ short_url : req.params.shortUrl });

//         if(data === null) {
//             res.status(404);
//         }
//         data.clicks++;
//         data.save();

//         res.status(200).json(data.url);
//     } catch(e) {
//         res.status(404).json({error : "Not Found"});
//     } 
// }

/***************************************** (POST) a URL *****************************************/
/* Promise */
// exports.post_url = (req, res) => {
//     // Checking whether the same URL already exists in the database
//     ShrinkUrl.findOne({ url : req.body.fullUrl })
//         .then((data) => {
//             if(data === null) {
//                 res.status(404);
//             }

//             res.status(409).json({ 
//                 "error" : "Short Url entry already exist for " + req.body.fullUrl,
//                 "short_url" : data.short_url 
//             });
//         }).catch((err) => {
//         // If it does not exist then Shrink it and SAVE
//             const url = new ShrinkUrl({
//                 url : req.body.fullUrl,
//             });
        
//             url.save()
//                 .then((savedUrl) => {
//                     if(savedUrl) {
//                         res.status(201).json(savedUrl);
//                     } 
//                 })
//                 .catch((err) => {
//                     res.status(403).json({error : "Forbidden"});
//                 })
//             ;
//         })
//     ;
// }

/* ASYNC / AWAIT */
exports.post_url = async (req, res) => {
    // Checking whether the same URL already exists in the database
    try {
        const data = await ShrinkUrl.findOne({ url : req.body.fullUrl });

        if(data === null) {
            res.status(404);
        }

        res.status(409).json({ 
            "error" : "Short Url entry already exist for " + req.body.fullUrl,
            "short_url" : data.short_url 
        });
    } catch(e) {
        // If it does not exist then Shrink it and SAVE
        const url = new ShrinkUrl({
            url : req.body.fullUrl,
        });
    
        try {
            const savedUrl = await url.save();
        
            if(savedUrl) {
                res.status(201).json(savedUrl);
            }
        } catch (err) {
            res.status(403).json({error : "Forbidden"});
        }
    } 
}

/***************************************** (PATCH) a url *****************************************/
/* Promise */
exports.update_url = (req, res) => {
    ShrinkUrl.updateOne({_id : req.params.urlId}, {$set : {url : req.body.fullUrl}})
        .then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.json({error : "Not found"});
        })
    ;
}

/* ASYNC / AWAIT */
// exports.update_url =  async (req, res) => {
//     try {
//         const data = await ShrinkUrl.updateOne({_id : req.params.urlId}, {$set : {url : req.body.fullUrl}});
//         res.status(200).json(data);
//     } catch(error) {
//         res.json({error : "Not found"});
//     } 
// }

/***************************************** (DELETE) a url *****************************************/
/* Promise */
// exports.delete_url = (req, res) => {
//     ShrinkUrl.deleteOne({_id : req.params.urlId})
//         .then((data) => {
//             res.status(200).json(data);
//         }).catch((err) => {
//             res.json({error : "Not found"});
//         })
//     ;
// }

/* ASYNC / AWAIT */
exports.delete_url = async (req, res) => {
    try {
        const data = await ShrinkUrl.deleteOne({_id : req.params.urlId})
        res.status(200).json(data);
    } catch(error) {
        res.json({error : "Not found"});
    } 
}
