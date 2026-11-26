CREATE TABLE IF NOT EXISTS guestbook (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  ip_hash TEXT
);
CREATE INDEX IF NOT EXISTS idx_guestbook_created ON guestbook (created_at DESC);

INSERT OR IGNORE INTO guestbook (id, name, message, created_at) VALUES
  ('seed-1', 'Prince Sahani', 'Hello world. This is my corner of the internet — say hi, leave a note, or just lurk. All three are welcome.', '2026-11-26T08:00:00.000Z'),
  ('seed-2', 'Prince Sahani', 'First note in the guestbook. Built this so people can leave a trace without signing up for anything.', '2026-11-25T14:30:00.000Z');
