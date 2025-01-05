const express = require('express');
const router = express.Router();
const News = require('../models/News.js');
const { createNews, getAllNews, getSpecificNews, searchNewsWithRegex, addNews } = require('../controllers/news.js');
const { authenticate, checkAdmin } = require('../controllers/auth.js');
const upload = require('../middlewares/multer.js');


router.post('/add', authenticate, checkAdmin, createNews)
      .post('/addnews', authenticate,checkAdmin, upload.single('urlToImage'), addNews)
      .get('/all',getAllNews)
      .get('/search', searchNewsWithRegex)
      .get('/:id',getSpecificNews)
     

module.exports = router;
