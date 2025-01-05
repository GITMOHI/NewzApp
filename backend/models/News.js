const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const NewsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  source: {
    name: {
      type: String,
      required: true
    }
  },
  description:{
    type: String,
  },
  publishedAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  urlToImage: {
    type: String 
  },
  content: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

NewsSchema.plugin(AutoIncrement, { inc_field: 'id' });

const News = mongoose.model('News', NewsSchema);

module.exports = News;
