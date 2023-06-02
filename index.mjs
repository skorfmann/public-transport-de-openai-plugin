import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';
import journey from './db.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Step 3: Define the jobs array
const jobs = [
  { id: 1, title: 'Software Engineer', description: 'Foo bar', url: "https://www.xing.com/jobs/innsbruck-senior-software-developer-102850163?paging_context=search&search_query%5Bkeywords%5D=Software%20Developer&search_query%5Blimit%5D=20&search_query%5Boffset%5D=0&ijt=jb_18"},
  { id: 2, title: 'Data engineer', description: 'Description 2', url: "https://www.xing.com/jobs/hamburg-senior-software-developer-102773966?paging_context=search&search_query%5Bkeywords%5D=Software%20Developer&search_query%5Blimit%5D=20&search_query%5Boffset%5D=0&ijt=jb_18"},
  // ... add more jobs as required
];

const app = express();
app.use(cors());


app.get('/openapi.yml', (req, res) => {
  fs.readFile(path.join(__dirname, 'openapi.yml'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.set('Content-Type', 'text/yaml');
      res.send(data);
    }
  });
});


app.get('/.well-known/ai-plugin.json', (req, res) => {
  fs.readFile(path.join(__dirname, '.well-known', 'ai-plugin.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.set('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

app.get('/journeys', async (req, res) => {
  const { start, destination, departure  } = req.query;

  const journeys = await journey.getJournyes(start, destination, departure)
  res.json(journeys);
});

// Step 5: Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
