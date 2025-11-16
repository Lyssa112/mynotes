-- migrate:up
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);

-- migrate:down
DROP TABLE notes;
