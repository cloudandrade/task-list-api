
CREATE SCHEMA `todolist`;

USE todolist;

CREATE TABLE IF NOT EXISTS `user` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `task` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`title` varchar(255) NOT NULL,
	`subtitle` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);