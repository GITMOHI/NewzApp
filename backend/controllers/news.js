const News = require("../models/News");

exports.createNews = async (req, res) => {
    try {
      const { title, source, publishedAt, urlToImage, content, url } = req.body;
  
      if (!title || !source?.name || !publishedAt || !content || !url) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
      }
  
      const news = new News({
        title,
        source,
        publishedAt,
        urlToImage,
        content,
        url
      });
  
      // Save to database
      await news.save();
  
      res.status(201).json({ message: 'News article created successfully.', news });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};  

exports.getAllNews = async (req, res) => {
    try {
      console.log('Get all news');
      const news = await News.find(); // Fetch all news articles
      console.log(news);
      res.status(200).json({ message: 'News articles retrieved successfully.',articles:news });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };

  exports.getSpecificNews = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the news article by ID
      const news = await News.findOne({ id });
  
      if (!news) {
        return res.status(404).json({ message: 'News article not found.' });
      }
  
      res.status(200).json({ message: 'News article retrieved successfully.', news });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
    

  exports.searchNewsWithRegex = async (req, res) => {
    console.log('searchNewsWithRegex');
    const { query } = req.query;
    console.log(`Searching`, query);
    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }
  
    try {
      const regexQuery = new RegExp(query, 'i');
      const newsArticles = await News.find({
        $or: [
          { title: { $regex: regexQuery } },
          { content: { $regex: regexQuery } },
          { 'source.name': { $regex: regexQuery } }
        ]
      })
      .sort({ publishedAt: -1 });

      console.log(newsArticles);
  
      res.status(200).json({
        totalResults: newsArticles.length,
        articles: newsArticles
      });


    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  };  


  exports.addNews = async (req, res) => {
    try {
      const { title, sourceName, description, content, url } = req.body;
      console.log(req.body.description);
  
      // Save news to database
      const news = new News({
        title,
        source: { name: sourceName },
        publishedAt:new Date(),
        urlToImage: req.file?.path, // Cloudinary image URL
        content,
        description,
        url,
      });
  
      await news.save();
      res.status(201).json({ message: 'News added successfully', news });
    } catch (error) {
      res.status(500).json({ message: 'Error adding news', error });
    }
  }