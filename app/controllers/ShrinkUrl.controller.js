const createError = require('http-errors');
const mongoose = require('mongoose');
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
                next(createError());
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
    //         next(createError());
    //     }
    // },

/***************************************** (GET) a Url by using "Shrinked url" *****************************************/
    /* Promise */
    get_single_url : (req, res, next) => {
        ShrinkUrl.findOne({ short_url : req.params.shortUrl }, { __v : 0 })
            .then((returnedUrl) => {
                if(returnedUrl === null) {
                    throw createError(404, "Short Url does not exist");
                }
                returnedUrl.clicks++;
                returnedUrl.save();
        
                res.status(200).json({ url : returnedUrl });
            }).catch((error) => {
                next(error);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // get_single_url : async (req, res, next) => {
    //     try {
    //         const returnedUrl = await ShrinkUrl.findOne({ short_url : req.params.shortUrl }, { __v : 0 });

    //         if(returnedUrl === null) {
    //             throw createError(404, "Short Url does not exist");
    //         }
    //         returnedUrl.clicks++;
    //         returnedUrl.save();

    //         res.status(200).json({ url : returnedUrl });
    //     } catch(error) {
    //         next(error);
    //     } 
    // },

/***************************************** (POST) a Url *****************************************/
    /* Promise */
    post_url : (req, res, next) => {
        // Checking whether the same URL already exists in the database
        ShrinkUrl.findOne({ url : req.body.fullUrl })
            .then((checkedUrl) => {
                if(checkedUrl === null) {
                    const url = new ShrinkUrl({
                        url : req.body.fullUrl,
                    });
                
                    url.save()
                        .then((savedUrl) => {
                            if(savedUrl) {
                                res.status(201).json({ url: savedUrl });
                            } 
                        })
                        .catch((error) => {
                            // Triggered when the ContentType of req.body.fullUrl is NOT SUPPORTED or req.body.fullUrl is EMPTY
                            if(error.name === "ValidationError") {
                                next(createError(422, error.message));
                                return;
                            }
                            next(error);
                        })
                    ;
                } else {
                    throw createError(409, req.body.fullUrl + " already exist as Short Url: " + checkedUrl.short_url);
                }
                
            }).catch((error) => {
                next(error);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // post_url : async (req, res, next) => {
    //     // Checking whether the same URL already exists in the database
    //     try {
    //         const checkedUrl = await ShrinkUrl.findOne({ url : req.body.fullUrl });
    //         if(checkedUrl === null) {
    //             // If the fullUrl not exist then Shrink it and SAVE
    //             const url = new ShrinkUrl({
    //                 url : req.body.fullUrl,
    //             });
            
    //             try {
    //                 const data = await url.save();
    //                 if(data) {
    //                     res.status(201).json({ url: data });
    //                 }
    //             } catch (error) {
    //                 // Triggered when the ContentType of req.body.fullUrl is NOT SUPPORTED or req.body.fullUrl is EMPTY
    //                 if(error.name === "ValidationError") {
    //                     next(createError(422, error.message));
    //                     return;
    //                 }
    //                 next(error);
    //             }
    //         } else {
    //             throw createError(409, req.body.fullUrl + " already exist as Short Url: " + checkedUrl.short_url);
    //         }
    //     } catch(error) {
    //         next(error);
    //     } 
    // },

/***************************************** (PATCH) a Url by using id *****************************************/
    /* Promise */
    update_url : (req, res, next) => {
        const id = req.params.urlId;
        const updates = { url : req.body.fullUrl };
        const options = { new : true };

        ShrinkUrl.findByIdAndUpdate(id, updates, options)
            .then((result) => {
                if(result === null) {
                    throw createError(404, "Url does not exist");  
                } else {
                    res.status(200).json({ 
                        status : "success",
                        code : 200,
                        message : "Url updated",
                        updated_url : result,
                    });
                }
            }).catch((error) => {
                if(error instanceof mongoose.CastError) {
                    next(createError(400, "Invalid Url id"));
                    return;
                }
                next(error);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // update_url : async (req, res, next) => {
    //     try {
    //         const id = req.params.urlId;
    //         const updates = { url : req.body.fullUrl };
    //         const options = { new : true };
            
    //         const result = await ShrinkUrl.findByIdAndUpdate(id, updates, options);
    //         if(result === null) {
    //             throw createError(404, "Url does not exist"); 
    //         } else {
    //             res.status(200).json({ 
    //                 status : "success",
    //                 code : 200,
    //                 message : "Url updated",
    //                 updated_url : result,
    //             });
    //         }
    //     } catch(error) {
    //         if(error instanceof mongoose.CastError) {
    //             next(createError(400, "Invalid Url id"));
    //             return;
    //         }
    //         next(error);
    //     } 
    // },

/***************************************** (DELETE) a Url by using id *****************************************/
    /* Promise */
    delete_url : (req, res, next) => {
        ShrinkUrl.findByIdAndDelete(req.params.urlId)
            .then((result) => {
                if(result === null) {
                    throw createError(404, "Url does not exist");
                } else {
                    res.status(200).json(
                        { 
                            status : "success",
                            code : 200,
                            message : "Url deleted",
                            deleted_url : result,
                        }
                    ); 
                }
            }).catch((error) => {
                if(error instanceof mongoose.CastError) {
                    next(createError(400, "Invalid Url id"));
                    return;
                }
                next(error);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // delete_url : async (req, res, next) => {
    //     try {
    //         const result = await ShrinkUrl.findByIdAndDelete(req.params.urlId);
            
    //         if(result === null) {
    //             throw createError(404, "Url does not exist"); 
    //         } else {
    //             res.status(200).json({ 
    //                 status : "success",
    //                 code : 200,
    //                 message : "Url deleted",
    //                 deleted_url : result,
    //             });
    //         }
            
    //     } catch(error) {
    //         if(error instanceof mongoose.CastError) {
    //             next(createError(400, "Invalid Url id"));
    //             return;
    //         }
    //         next(error);
    //     } 
    // },
}
