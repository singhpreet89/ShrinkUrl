const createError = require('http-errors');
const mongoose = require('mongoose');
const shortId = require('shortid');

const ShrinkUrl = require('../models/ShrinkUrl.model'); 

module.exports = {
/***************************************** (GET) all Url's *****************************************/
    /* Promise */
    getAllUrls : (req, res, next) => {
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
    // getAllUrls : async (req, res, next) => {
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
    getSingleUrl : (req, res, next) => {
        ShrinkUrl.findOne({ _id : req.params.urlId }, { __v : 0 })
            .then((returnedUrl) => {
                if(returnedUrl === null) {
                    throw createError(404, "Url does not exist");
                }
                returnedUrl.clicks++;
                returnedUrl.clicked_at = new Date(Date.now());
                returnedUrl.save();
        
                res.status(200).json({ url : returnedUrl });
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
    // getSingleUrl : async (req, res, next) => {
    //     try {
    //         const returnedUrl = await ShrinkUrl.findOne({ _id : req.params.urlId }, { __v : 0 });

    //         if(returnedUrl === null) {
    //             throw createError(404, "Url does not exist");
    //         }
    //         returnedUrl.clicks++;
    //         returnedUrl.clicked_at = new Date(Date.now());
    //         returnedUrl.save();

    //         res.status(200).json({ url : returnedUrl });
    //     } catch(error) {
    //         if(error instanceof mongoose.CastError) {
    //             next(createError(400, "Invalid Url id"));
    //             return;
    //         }
    //         next(error);
    //     } 
    // },

/***************************************** (POST) a Url *****************************************/
    /* Promise */
    postUrl : (req, res, next) => {
        // Checking whether the same URL already exists in the database
        ShrinkUrl.findOne({ url : req.body.fullUrl })
            .then((checkedUrl) => {
                if(checkedUrl === null) {
                    const url = new ShrinkUrl({
                        url : req.body.fullUrl,
                        short_url : process.env.APP_SHORT_URL_PREFIX + shortId.generate(),
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
    // postUrl : async (req, res, next) => {
    //     // Checking whether the same URL already exists in the database
    //     try {
    //         const checkedUrl = await ShrinkUrl.findOne({ url : req.body.fullUrl });
    //         if(checkedUrl === null) {
    //             // If the fullUrl not exist then Shrink it and SAVE
    //             const url = new ShrinkUrl({
    //                 url : req.body.fullUrl,
    //                 short_url : process.env.APP_SHORT_URL_PREFIX + shortId.generate(),
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
    updateUrl : (req, res, next) => {
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
    // updateUrl : async (req, res, next) => {
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
    deleteUrl : (req, res, next) => {
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
    // deleteUrl : async (req, res, next) => {
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

/***************************************** (DELETE / REMOVE) the Collection *****************************************/
    /* Promise */
    deleteCollection : (req, res, next) => {
    ShrinkUrl.deleteMany()
            .then((result) => {
                if(result.n === result.deletedCount) {
                    res.status(200).json(
                        { 
                            status : "success",
                            code : 200,
                            message : "Collection deleted",
                        }
                    );
                } else if(result.n !== result.deletedCount) {
                    throw createError(404, "Can not delete all the URLs");
                } else {
                    throw createError();
                }
            }).catch((error) => {
                next(error);
            })
        ;
    },

    /* ASYNC / AWAIT */
    // deleteCollection : async (req, res, next) => {
    //     try {
    //         const result = await ShrinkUrl.deleteMany();

    //         if(result.n === result.deletedCount) {
    //             res.status(200).json(
    //                 { 
    //                     status : "success",
    //                     code : 200,
    //                     message : "Collection deleted",
    //                 }
    //             );
    //         } else if(result.n !== result.deletedCount) {
    //             throw createError(404, "Can not delete all the URLs");
    //         } else {
    //             throw createError();
    //         }
            
    //     } catch(error) {
    //         next(error);
    //     } 
    // },
}
