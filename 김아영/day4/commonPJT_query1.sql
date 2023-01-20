drop DATABASE common_pjt;
CREATE DATABASE common_pjt default CHARACTER SET UTF8;
use common_pjt;

CREATE TABLE member (
	id INT NOT NULL AUTO_INCREMENT,
	role ENUM('admin', 'member'),
    is_active boolean,
	PRIMARY KEY(id)
);

# personal_info

-- CREATE TABLE member_info (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	member_id INT,
--     phone_number VARCHAR(20),
--     email VARCHAR(20),
--     brith VARCHAR(20),
--     sex VARCHAR(20),
--     created_date DATETIME,
--     updated_date DATETIME,
-- 	PRIMARY KEY(id),
--     FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
-- );

CREATE TABLE member_profile (
	id INT NOT NULL AUTO_INCREMENT,
	member_id INT,
    nickname VARCHAR(20),
    img VARCHAR(200),
    text TEXT,
    exp INT,
	badge ENUM("입덕","초보덕","아마추덕","프로덕","슈퍼덕"),
    created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE member_gallery (
	id INT NOT NULL AUTO_INCREMENT,
	member_id INT,
    is_active boolean,
    is_private boolean,
    img VARCHAR(200),
    created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE member_info (
	id INT NOT NULL AUTO_INCREMENT,
	member_id INT,
    phone_number VARCHAR(20),
    email VARCHAR(20),
    age INT,
    sex INT,
    social_code VARCHAR(200),
    external_id VARCHAR(200),
    access_token VARCHAR(200),
    created_date DATETIME,
    updated_date DATETIME,
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
	PRIMARY KEY(id)
);

CREATE TABLE board (
	id INT NOT NULL AUTO_INCREMENT,
	member_id INT,
    is_active boolean,
    title VARCHAR(100),
    content TEXT,
    count int,
    `like` int,
    category ENUM('info','qa'),
    created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE board_gallery (
	id INT NOT NULL AUTO_INCREMENT,
	board_id INT,
    img VARCHAR(200),
    created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (`board_id`) REFERENCES `board` (`id`)
);

CREATE TABLE board_comment (
	id INT NOT NULL AUTO_INCREMENT,
    member_id INT,
	board_id INT,
    is_active boolean,
    content TEXT,
    `like` int,
    created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    FOREIGN KEY (`board_id`) REFERENCES `board` (`id`)
);

CREATE TABLE my_makeup (
	id INT NOT NULL AUTO_INCREMENT,
	member_id INT,
    makeup_id INT,
    created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE recent_makeup (
	id INT NOT NULL AUTO_INCREMENT,
	member_id INT,
    makeup_id INT,
    created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE makeup (
	id INT NOT NULL AUTO_INCREMENT,
    is_active boolean,
    title VARCHAR(20),
	text TEXT,
    creator VARCHAR(20),
    img VARCHAR(200),
    time INT,
	PRIMARY KEY(id)
);

CREATE TABLE makeup_main (
	id INT NOT NULL AUTO_INCREMENT,
    makeup_id INT,
    step ENUM('skim','eyebrow','eye','contour','lip'),
	PRIMARY KEY(id),
    FOREIGN KEY (`makeup_id`) REFERENCES `makeup` (`id`)
);

CREATE TABLE makeup_sub (
	id INT NOT NULL AUTO_INCREMENT,
    makeup_main_id INT,
    step ENUM('eyerash','eyeliner','eyeshadow','cheek','shading'),
    img VARCHAR(200),
    color_code VARCHAR(20),
    content text,
    `order` int,
	PRIMARY KEY(id),
    FOREIGN KEY (`makeup_main_id`) REFERENCES `makeup_main` (`id`)
);


CREATE TABLE meeting (
	id INT NOT NULL AUTO_INCREMENT,
    is_active boolean,
    title VARCHAR(200),
    text TEXT,
    host VARCHAR(20),
    category ENUM('consult','together'),
	created_date DATETIME,
    updated_date DATETIME,
	PRIMARY KEY(id)
);




