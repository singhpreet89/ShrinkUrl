const express = require('express');
const router = express.Router();

// CONTROLLER
const ShrinkUrlController = require('../controllers/ShrinkUrlController');

// ROUTES
router.get("/urls", ShrinkUrlController.get_all_urls);
router.post("/urls", ShrinkUrlController.post_url);
router.get('/urls/:shortUrl', ShrinkUrlController.get_single_url);
router.delete('/delete', ShrinkUrlController.delete_url);
router.patch('/update', ShrinkUrlController.update_url);
// router.post("/", (req, res) => {
//     console.log("REQUEST: " , req.body);
// });

module.exports = router;