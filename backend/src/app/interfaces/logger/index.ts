/**
 * @package app.interfaces.logger
 * @version 1.0.1
 * @author Rafael Chavez
 * @description File to create the settings for the logging system
 */
import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";

// General purpouse variables
const logPath = path.join(__dirname, "../../../logs/");
const colors = {
	error: "red",
	warn: "yellow",
	info: "blue",
	http: "magenta",
	debug: "green",
};
winston.addColors(colors);
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};
const getLevel = () => {
	const current = (process.env.NODE_ENV as string) || "development";
	let isDev = current === "development";
	return isDev ? "debug" : "info";
};
// Format
const format = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);
//Create transports
const transports = [
	new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize({
				all: true,
			})
		),
	}),
	new winston.transports.DailyRotateFile({
		filename: "error-%DATE%.log",
		datePattern: "YYYY-MM-DD",
		zippedArchive: true,
		dirname: logPath,
		maxSize: "2m",
		maxFiles: "31d",
		level: "warn",
		handleExceptions: true,
		handleRejections: true,
	}),
	new winston.transports.DailyRotateFile({
		filename: "app-%DATE%.log",
		datePattern: "YYYY-MM-DD",
		zippedArchive: true,
		dirname: logPath,
		maxSize: "2m",
		maxFiles: "31d",
	}),
];
// Create logger
const Logger = winston.createLogger({
	level: getLevel(),
	levels,
	format,
	transports,
});
export default Logger;
