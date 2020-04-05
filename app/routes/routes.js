const express = require('express');
const router = express.Router();

// CONTROLLER
const ShrinkUrlController = require('../controllers/ShrinkUrlController');

// ROUTES
router.get("/", ShrinkUrlController.get_all_urls);
router.post("/", ShrinkUrlController.post_url);
router.get('/:shortUrl', ShrinkUrlController.get_single_url);
router.delete('/delete/:urlId', ShrinkUrlController.delete_url);
router.patch('/update/:urlId', ShrinkUrlController.update_url);
// router.post("/", (req, res) => {
//     console.log("REQUEST: " , req.body);
// });

module.exports = router;