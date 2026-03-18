CREATE TABLE IF NOT EXISTS main_inquiries (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  customer_name TEXT NOT NULL,
  company_name TEXT,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  industry TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  client_name TEXT NOT NULL,
  company_name TEXT,
  industry TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_inquiries_status ON main_inquiries(status);
CREATE INDEX idx_inquiries_created ON main_inquiries(created_at);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);
