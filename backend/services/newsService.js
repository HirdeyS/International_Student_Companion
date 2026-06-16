import Parser from 'rss-parser';
import News from '../models/News.js';

const parser = new Parser();

// News sources
const NEWS_SOURCES = [
  {
    name: 'IRCC Updates',
    url: 'https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=200&format=atom&atomtitle=Immigration,%20Refugees%20and%20Citizenship%20Canada'
  },
  {
    name: 'CBC News Canada',
    url: 'https://www.cbc.ca/webfeed/rss/rss-canada'
  },
  {
    name: 'CIC News',
    url: 'https://www.cicnews.com/feed'
  },
  {
    name: 'Global News',
    url: 'https://globalnews.ca/feed/'
  },
  {
    name: 'Toronto Star',
    url: 'https://www.thestar.com/search/?f=rss&t=article&c=news*&l=50&s=start_time&sd=desc'
  }
];

const studentKeywords = [
  'student', 'study permit', 'pgwp', 'university', 
  'college', 'dli', 'attestation', 'pal', 'co-op', 'post-secondary'
];


const syncSource = async (source) => {
  try {
    const feed = await parser.parseURL(source.url);
    
    // Filter the feed for relevant articles
    const filteredItems = feed.items.filter(item => {
      const content = `${item.title} ${item.contentSnippet || item.summary || ''}`.toLowerCase();
      return studentKeywords.some(keyword => content.includes(keyword));
    });

    const operations = filteredItems.map(item => ({
      updateOne: {
        filter: { link: item.link },
        update: {
          $set: {
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate || item.isoDate),
            summary: item.contentSnippet || item.summary
          }
        },
        upsert: true
      }
    }));

    if (operations.length > 0) {
      await News.bulkWrite(operations);
    }
  } catch (error) {
    console.error(`Error syncing news from ${source.name}:`, error.message);
  }
};

// Main function to sync all configured news sources
export const syncAllNews = async () => {
  for (const source of NEWS_SOURCES) {
    await syncSource(source);
  }
};
