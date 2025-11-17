-- migrate:up
ALTER TABLE notes
    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- migrate:down
ALTER TABLE notes
    DROP COLUMN updated_at,
    DROP COLUMN created_at;