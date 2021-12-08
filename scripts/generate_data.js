const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const DOMAINS = [
  'www.hulu.com',
  'www.netflix.com',
  'www.primevideo.com',
  'www.hbomax.com',
  'www.disneyplus.com',
  'www.crunchyroll.com',
  'www.wakanim.tv',
  'www.animedigitalnetwork.fr',
  'www.funimation.fr',
];

const MAX_AMOUNT = 6;

function generateRandomLinks(id) {
  const amount = Math.floor(Math.random() * MAX_AMOUNT);

  const links = new Set();
  for (let i = 0; i < amount; i++) {
    const index = Math.floor(Math.random() * DOMAINS.length);
    const link = DOMAINS[index];
    links.add(`https://${link}/_/${id}`);
  };

  return [...links];
};


const data = JSON.parse(readFileSync(join(__dirname, './sample.json'), { encoding: 'utf-8' }));
for (const item of data) item.links = generateRandomLinks(item._id.$oid);

writeFileSync(join(__dirname, './data.json'), JSON.stringify(data.slice(0, 3_000), undefined, 2), { encoding: 'utf-8' });
