-- migrate:up
ALTER TABLE notes
    ADD COLUMN archived_at TIMESTAMPTZ NULL;

UPDATE notes
SET archived_at = NOW()
WHERE archived = TRUE;

ALTER TABLE notes
    DROP COLUMN archived;

-- migrate:down
ALTER TABLE notes
    ADD COLUMN archived BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE notes
    DROP COLUMN archived_at;