import { create } from 'xmlbuilder2';

// Example data for the podcast
const podcastData = {
  title: 'My Awesome Podcast',
  description: 'A podcast about awesome things.',
  language: 'en-us',
  copyright: '2024 My Podcast',
  link: 'https://mypodcast.com',
  episodes: [
    {
      title: 'Episode 1: The Beginning',
      description: 'In this episode, we talk about how everything started.',
      pubDate: new Date('2024-01-01').toUTCString(),
      duration: '30:00',
      audioUrl: 'https://mypodcast.com/audio/episode1.mp3',
      guid: '123456',
    },
    {
      title: 'Episode 2: The Journey Continues',
      description: 'In this episode, we continue our journey.',
      pubDate: new Date('2024-02-01').toUTCString(),
      duration: '45:00',
      audioUrl: 'https://mypodcast.com/audio/episode2.mp3',
      guid: '123457',
    },
  ],
};

// Create the XML document
const feed = create({ version: '1.0', encoding: 'UTF-8' })
  .ele('rss', { version: '2.0' })
  .ele('channel')
  .ele('title').txt(podcastData.title).up()
  .ele('description').txt(podcastData.description).up()
  .ele('language').txt(podcastData.language).up()
  .ele('copyright').txt(podcastData.copyright).up()
  .ele('link').txt(podcastData.link).up();

// Add each episode
podcastData.episodes.forEach((episode) => {
  feed
    .ele('item')
    .ele('title').txt(episode.title).up()
    .ele('description').txt(episode.description).up()
    .ele('pubDate').txt(episode.pubDate).up()
    .ele('enclosure', { url: episode.audioUrl, type: 'audio/mpeg' }).up()
    .ele('guid').txt(episode.guid).up()
    .ele('duration').txt(episode.duration).up()
    .up();
});

// Convert the XML to a string
const xmlString = feed.end({ prettyPrint: true });
console.log(xmlString);

