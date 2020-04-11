const express = require('express');
const router = express.Router();
const ShrinkUrlController = require('../controllers/ShrinkUrl.controller');
const ValidateVerifyUrl = require('../middlewares/requests/ValidateVerifyUrl.middleware');

router.get("/", ShrinkUrlController.getAllUrls);
router.get('/:urlId', ShrinkUrlController.getSingleUrl);

router.post("/", ValidateVerifyUrl, ShrinkUrlController.postUrl);

router.patch('/update/:urlId', ValidateVerifyUrl, ShrinkUrlController.updateUrl);

router.delete('/delete/:urlId', ShrinkUrlController.deleteUrl);
router.delete('/delete', ShrinkUrlController.deleteCollection);

module.exports = router;