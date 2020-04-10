const express = require('express');
const app = express();
const createError = require('http-errors');

// Handle all the non existant paths
exports.nonExistantPathsHandler = () => {
    return createError(404, "Path Not found");
}

// Handle Generic Errors
exports.genericExceptionHandler = (err, res) => {
    return res.status(err.status || 500).json({ 
        status : "error",
        code : err.status || 500,
        message : err.message || "Internal Server error",
    });
}
