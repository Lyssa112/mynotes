import express from 'express';
import sql from './db.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

const app = express();
app.use(express.json());

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/notes', async (req, res) => {
    const notes = await sql`SELECT * FROM notes ORDER BY id`;
    res.json(notes);
});

app.post('/notes', async (req, res) => {
    const { content } = req.body;
    const [note] = await sql`
    INSERT INTO notes (content)
    VALUES (${content})
    RETURNING *
  `;
    res.status(201).json(note);
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
