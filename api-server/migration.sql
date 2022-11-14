DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users(
	user_id SERIAL,
  	username VARCHAR(30) UNIQUE,
  	password VARCHAR(30),
  	CONSTRAINT user_key PRIMARY KEY (user_id)
);


CREATE TABLE posts(
	post_id SERIAL,
  	content TEXT,
  	user_id INTEGER REFERENCES users(user_id),
  	CONSTRAINT post_key PRIMARY KEY (post_id)
);

INSERT INTO users(username, password) VALUES('Hopper', 'pass'),
				 ('travis','hello'),
                 ('austin', 'secret');
                 
INSERT INTO posts(content, user_id) VALUES('I like yellow', 2),
										  ('I like trains', 3),
                                          ('I like pie', 1),
                                          ('Bananas are awesome', 2);
