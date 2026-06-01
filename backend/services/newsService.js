import Parser from 'rss-parser';
import News from '../models/News.js';

const parser = new Parser();
const IRCC_FEED_URL = 'https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=200&format=atom&atomtitle=Immigration,%20Refugees%20and%20Citizenship%20Canada';

const studentKeywords = [
  'student', 'study permit', 'pgwp', 'university', 
  'college', 'dli', 'attestation', 'pal', 'co-op', 'post-secondary'
];

export const syncIRCCNews = async () => {
  console.log('Starting IRCC news sync...');
  try {
    const feed = await parser.parseURL(IRCC_FEED_URL);
    
    //Filter the feed for relevant articles
    const filteredItems = feed.items.filter(item => {
      //Safely handle undefined snippets/summaries
      const content = `${item.title} ${item.contentSnippet || item.summary || ''}`.toLowerCase();
      //Keep item if it includes at least one keyword
      return studentKeywords.some(keyword => content.includes(keyword));
    });

    console.log(`Filtered ${feed.items.length} total articles down to ${filteredItems.length} student-related articles.`);

    //Map only the filtered items to database operations
    const operations = filteredItems.map(item => ({
      updateOne: {
        filter: { link: item.link },
        update: {
          $set: {
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate || item.isoDate),
            summary: item.contentSnippet || item.summary,
            category: 'IRCC Update'
          }
        },
        upsert: true
      }
    }));

    if (operations.length > 0) {
      const result = await News.bulkWrite(operations);
      console.log(`IRCC news sync completed. Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
    } else {
      console.log('No new student-related items found in the feed.');
    }
  } catch (error) {
    console.error('Error syncing IRCC news:', error.message);
  }
};
