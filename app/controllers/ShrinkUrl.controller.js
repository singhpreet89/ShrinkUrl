const ShrinkUrl = require('../models/ShrinkUrl.model'); 

module.exports = {
/***************************************** (GET) all Url's *****************************************/
    /* Promise */
    get_all_urls : (req, res, next) => {
        ShrinkUrl.find({}, '-__v')    
        // OR
        // ShrinkUrl.find({}, '__id clicks url short_url date')
            .then((data) => {
                res.status(200).json(
                    { data : 
                        { urls : data }
                    }
                );
            }).catch((error) => {
                next(new Error());
            })
        ;
    },

    /* ASYNC / AWAIT */
    // get_all_urls : async (req, res, next) => {
    //     try {
    //         const urls = await ShrinkUrl.find({}, {__v : 0});
    //         // OR
    //         // ShrinkUrl.find({}, '__id clicks url short_url date')
    //         res.status(200).json(
    //             { data : 
    //                 { urls : urls }
    //             }
    //         );
    //     } catch(error) {
    //         next(new Error());
    //     }
    // },

/***************************************** (GET) a Url by using "Shrinked url" *****************************************/
    /* Promise */
    get_single_url : (req, res, next) => {
        ShrinkUrl.findOne({ short_url : req.params.shortUrl })
            .then((data) => {
                if(data === null) {
                    throw 0;
                }
                data.clicks++;
                data.save();
        
                res.status(200).json(
                    { data : 
                        { url : data.url }
                    }
                );
            }).catch((error) => {
                const err = new Error("Short Url not found");
                err.status = 404;
                next(err);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // get_single_url : async (req, res, next) => {
    //     try {
    //         const data = await ShrinkUrl.findOne({ short_url : req.params.shortUrl });

    //         if(data === null) {
    //             throw 0;
    //         }
    //         data.clicks++;
    //         data.save();

    //         res.status(200).json(
    //             { data : 
    //                 { url : data.url }
    //             }
    //         );
    //     } catch(error) {
    //         const err = new Error("Short Url not found");
    //         err.status = 404;
    //         next(err);
    //     } 
    // },

/***************************************** (POST) a Url *****************************************/
    /* Promise */
    post_url : (req, res, next) => {
        // Checking whether the same URL already exists in the database
        ShrinkUrl.findOne({ url : req.body.fullUrl })
            .then((data) => {
                const err = new Error(req.body.fullUrl + " already exist as: " + data.short_url);
                err.status = 409;
                next(err);
            }).catch((err) => {
            // If it does not exist then Shrink it and SAVE
                const url = new ShrinkUrl({
                    url : req.body.fullUrl,
                });
            
                url.save()
                    .then((savedUrl) => {
                        if(savedUrl) {
                            res.status(201).json({ data: savedUrl });
                        } 
                    })
                    .catch((error) => {
                        // Triggered when the ContentType of req.body.fullUrl is NOT SUPPORTED or req.body.fullUrl is EMPTY
                        const err = new Error("Url is required");
                        err.status = 422;
                        next(err);
                    })
                ;
            })
        ;
    },

    /* ASYNC / AWAIT */
    // post_url : async (req, res, next) => {
    //     // Checking whether the same URL already exists in the database
    //     try {
    //         const data = await ShrinkUrl.findOne({ url : req.body.fullUrl });
    //         // console.log("DATA:" , data);
    //         // if(data === null) {
    //         //     const err = new Error("Bad request");
    //         //     err.status = 400;
    //         //     next(err);
    //         // }

    //         const err = new Error(req.body.fullUrl + " already exist as: " + data.short_url);
    //         err.status = 409;
    //         next(err);
    //     } catch(e) {
    //         // If it does not exist then Shrink it and SAVE
    //         const url = new ShrinkUrl({
    //             url : req.body.fullUrl,
    //         });
        
    //         try {
    //             const savedUrl = await url.save();
            
    //             if(savedUrl) {
    //                 res.status(201).json({ data: savedUrl });
    //             }
    //         } catch (error) {
    //             // Triggered when the ContentType of req.body.fullUrl is NOT SUPPORTED or req.body.fullUrl is EMPTY
    //             const err = new Error("Url is required");
    //             err.status = 422;
    //             next(err);
    //         }
    //     } 
    // },

/***************************************** (PATCH) a Url by using id *****************************************/
    /* Promise */
    update_url : (req, res, next) => {
        ShrinkUrl.updateOne({_id : req.params.urlId}, {$set : {url : req.body.fullUrl}})
            .then((data) => {
                if((data.nModified === 1 && data.n === 1) || (data.nModified === 0 && data.n === 1)) {
                    res.status(200).json({ data:
                        { 
                            status : "success",
                            code : 200,
                            message : "Url updated"
                        }
                    });  
                } else {
                    throw 0;    // Throwing custom exception to call the catch block
                }
            }).catch((error) => {
                const err = new Error("Id not found");
                err.status = 404;
                next(err);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // update_url : async (req, res, next) => {
    //     try {
    //         const data = await ShrinkUrl.updateOne({_id : req.params.urlId}, {$set : {url : req.body.fullUrl}});
    //         if((data.nModified === 1 && data.n === 1) || (data.nModified === 0 && data.n === 1)) {
    //             res.status(200).json({ data:
    //                 { 
    //                     status : "success",
    //                     code : 200,
    //                     message : "Url updated"
    //                 }
    //             }); 
    //         } else {
    //             throw 0;    // Throwing custom exception to call the catch block
    //         }
    //     } catch(error) {
    //         const err = new Error("Id not found");
    //         err.status = 404;
    //         next(err);
    //     } 
    // },

/***************************************** (DELETE) a Url by using id *****************************************/
    /* Promise */
    delete_url : (req, res, next) => {
        ShrinkUrl.deleteOne({_id : req.params.urlId})
            .then((data) => {
                if(data.deletedCount === 1 && data.n === 1) {
                    res.status(200).json({ data:
                        { 
                            status : "success",
                            code : 200,
                            message : "Url deleted"
                        }
                    }); 
                } else {
                    throw 0;
                }
            }).catch((error) => {
                const err = new Error("Id not found");
                err.status = 404;
                next(err);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // delete_url : async (req, res, next) => {
    //     try {
    //         const data = await ShrinkUrl.deleteOne({_id : req.params.urlId});
    //         if(data.deletedCount === 1 && data.n === 1) {
    //             res.status(200).json({ data:
    //                 { 
    //                     status : "success",
    //                     code : 200,
    //                     message : "Url deleted"
    //                 }
    //             }); 
    //         } else {
    //             throw 0;    // Throwing custom exception to call the catch block
    //         }
            
    //     } catch(error) {
    //         const err = new Error("Id not found");
    //         err.status = 404;
    //         next(err);
    //     } 
    // },
}
