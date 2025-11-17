-- migrate:up
ALTER TABLE notes
    ADD COLUMN archived_at TIMESTAMPTZ;

ALTER TABLE notes
    DROP COLUMN archived;

-- migrate:down
ALTER TABLE notes
    ADD COLUMN archived BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE notes
    DROP COLUMN archived_at;