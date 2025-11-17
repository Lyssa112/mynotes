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

// DB → API mapping
function mapNote(row) {
  return {
    id: row.id,
    title: row.title ?? null,
    content: row.content,
    archived: row.archived ?? false,
  };
}

app.get('/notes', async (req, res) => {
  const rows = await sql`SELECT * FROM notes ORDER BY id`;
  const notes = rows.map(mapNote);
  res.json({ notes });
});

app.post('/notes', async (req, res) => {
  const { content } = req.body ?? {};

  if (!content) {
    return res.status(400).json({
      message: 'content is required',
      code: 'BAD_REQUEST',
      details: {},
    });
  }

  const [row] = await sql`
    INSERT INTO notes (content)
    VALUES (${content})
    RETURNING *
  `;

  const note = mapNote(row);
  res.status(201).json(note);
});

app.get('/notes/:noteId', async (req, res) => {
  const id = Number(req.params.noteId);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'noteId must be an integer',
      code: 'BAD_REQUEST',
      details: {},
    });
  }

  const rows = await sql`SELECT * FROM notes WHERE id = ${id}`;
  const row = rows[0];

  if (!row) {
    return res.status(404).json({
      message: 'Note not found',
      code: 'NOT_FOUND',
      details: { noteId: id },
    });
  }

  res.json(mapNote(row));
});

app.patch('/notes/:noteId', async (req, res) => {
  const id = Number(req.params.noteId);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'noteId must be an integer',
      code: 'BAD_REQUEST',
      details: {},
    });
  }

  const { content } = req.body ?? {};
  if (!content) {
    return res.status(400).json({
      message: 'content is required',
      code: 'BAD_REQUEST',
      details: {},
    });
  }

  const rows = await sql`
    UPDATE notes
    SET content = ${content}
    WHERE id = ${id}
    RETURNING *
  `;
  const row = rows[0];

  if (!row) {
    return res.status(404).json({
      message: 'Note not found',
      code: 'NOT_FOUND',
      details: { noteId: id },
    });
  }

  res.json(mapNote(row));
});

app.delete('/notes/:noteId', async (req, res) => {
  const id = Number(req.params.noteId);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'noteId must be an integer',
      code: 'BAD_REQUEST',
      details: {},
    });
  }

  const result = await sql`
    DELETE FROM notes
    WHERE id = ${id}
    RETURNING id
  `;
  const row = result[0];

  if (!row) {
    return res.status(404).json({
      message: 'Note not found',
      code: 'NOT_FOUND',
      details: { noteId: id },
    });
  }

  res.status(204).send();
});

app.patch('/notes/:noteId/archive', async (req, res) => {
  const id = Number(req.params.noteId);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: 'noteId must be an integer',
      code: 'BAD_REQUEST',
      details: {},
    });
  }

  const { archived } = req.body ?? {};
  if (typeof archived !== 'boolean') {
    return res.status(400).json({
      message: 'archived must be a boolean',
      code: 'BAD_REQUEST',
      details: {},
    });
  }

  const rows = await sql`SELECT * FROM notes WHERE id = ${id}`;
  const row = rows[0];

  if (!row) {
    return res.status(404).json({
      message: 'Note not found',
      code: 'NOT_FOUND',
      details: { noteId: id },
    });
  }

  const note = {
    ...mapNote(row),
    archived,
  };

  res.json(note);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
