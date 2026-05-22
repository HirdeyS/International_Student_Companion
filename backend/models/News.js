import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true 
  },
  pubDate: {
    type: Date,
    required: true
  },
  summary: {
    type: String
  },
  category: {
    type: String,
    default: 'IRCC Update' 
  }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

export default News;
