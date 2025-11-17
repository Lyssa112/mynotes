-- migrate:up
ALTER TABLE notes
    ADD COLUMN title TEXT NULL,
    ADD COLUMN archived BOOLEAN NOT NULL DEFAULT FALSE;

-- migrate:down
ALTER TABLE notes
    DROP COLUMN archived,
    DROP COLUMN title;