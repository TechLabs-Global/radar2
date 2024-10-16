-- CREATE DATABASE radar;

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE events (
  id VARCHAR(255) PRIMARY KEY,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  description TEXT,
  type VARCHAR(255) NOT NULL,
  is_public BOOLEAN NOT NULL,
  is_mandatory BOOLEAN NOT NULL,
  location_id SERIAL,
  FOREIGN KEY (location_id) REFERENCES locations(id)
);
