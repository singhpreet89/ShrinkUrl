const ShrinkUrl = require('../models/ShrinkUrl.model'); 

module.exports = {
/***************************************** (GET) all Url's *****************************************/
    /* Promise */
    get_all_urls : (req, res, next) => {
        ShrinkUrl.find({}, '-__v')    
        // OR
        // ShrinkUrl.find({}, '__id clicks url short_url date')
            .then((data) => {
                res.status(200).json({ urls : data });
            }).catch((error) => {
                next(new Error());
            })
        ;
    },

    /* ASYNC / AWAIT */
    // get_all_urls : async (req, res, next) => {
    //     try {
    //         const urls = await ShrinkUrl.find({}, { __v : 0 });
    //         // OR
    //         // ShrinkUrl.find({}, '__id clicks url short_url date')
    //         res.status(200).json({ urls : urls });
    //     } catch(error) {
    //         next(new Error());
    //     }
    // },

/***************************************** (GET) a Url by using "Shrinked url" *****************************************/
    /* Promise */
    get_single_url : (req, res, next) => {
        ShrinkUrl.findOne({ short_url : req.params.shortUrl }, { __v : 0 })
            .then((data) => {
                if(data === null) {
                    throw 0;
                }
                data.clicks++;
                data.save();
        
                res.status(200).json({ url : data });
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
    //         const data = await ShrinkUrl.findOne({ short_url : req.params.shortUrl }, { __v : 0 });

    //         if(data === null) {
    //             throw 0;
    //         }
    //         data.clicks++;
    //         data.save();

    //         res.status(200).json({ url : data });
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
            // If the fullUrl does not exist then Shrink it and SAVE
                const url = new ShrinkUrl({
                    url : req.body.fullUrl,
                });
            
                url.save()
                    .then((data) => {
                        if(data) {
                            res.status(201).json({ url: data });
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
            
    //         const err = new Error(req.body.fullUrl + " already exist as: " + data.short_url);
    //         err.status = 409;
    //         next(err);
    //     } catch(e) {
    //         // If the fullUrl not exist then Shrink it and SAVE
    //         const url = new ShrinkUrl({
    //             url : req.body.fullUrl,
    //         });
        
    //         try {
    //             const data = await url.save();
    //             if(data) {
    //                 res.status(201).json({ url: data });
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
        const id = req.params.urlId;
        const updates = { url : req.body.fullUrl };
        const options = { new : true };

        ShrinkUrl.findByIdAndUpdate(id, updates, options)
            .then((data) => {
                if(data === null) {
                    throw 0;  
                } else {
                    res.status(200).json({ 
                        status : "success",
                        code : 200,
                        message : "Url updated",
                        updated_url : data,
                    });
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
    //         const id = req.params.urlId;
    //         const updates = { url : req.body.fullUrl };
    //         const options = { new : true };
            
    //         const data = await ShrinkUrl.findByIdAndUpdate(id, updates, options);
    //         if((data === null)) {
    //             throw 0; 
    //         } else {
    //             res.status(200).json({ 
    //                 status : "success",
    //                 code : 200,
    //                 message : "Url updated",
    //                 updated_url : data,
    //             });
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
        ShrinkUrl.findByIdAndDelete(req.params.urlId)
            .then((data) => {
                if(data === null) {
                    throw 0;
                } else {
                    res.status(200).json({ 
                        status : "success",
                        code : 200,
                        message : "Url deleted",
                        deleted_url : data,
                    }); 
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
    //         const data = await ShrinkUrl.findByIdAndDelete(req.params.urlId);
            
    //         if(data === null) {
    //             throw 0; 
    //         } else {
    //             res.status(200).json({ 
    //                 status : "success",
    //                 code : 200,
    //                 message : "Url deleted",
    //                 deleted_url : data,
    //             });
    //         }
            
    //     } catch(error) {
    //         const err = new Error("Id not found");
    //         err.status = 404;
    //         next(err);
    //     } 
    // },
}
