const express = require('express');
const router = express.Router();
const ShrinkUrlController = require('../controllers/ShrinkUrl.controller');
const VerifyUrl = require('../middlewares/requests/VerifyUrl.middleware');

router.get("/", ShrinkUrlController.get_all_urls);
router.get('/:shortUrl', ShrinkUrlController.get_single_url);

router.post("/",  VerifyUrl, ShrinkUrlController.post_url);

router.patch('/update/:urlId', VerifyUrl, ShrinkUrlController.update_url);

router.delete('/delete/:urlId', ShrinkUrlController.delete_url);
router.delete('/delete', ShrinkUrlController.delete_collection);

module.exports = router;