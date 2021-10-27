const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      level: 'error',
      name: 'error-file',
      maxsize: 5120000,
      maxFiles: 10,
      filename: `${__dirname}/../logs/api-error.log`,
    }),
    new transports.File({
      maxsize: 5120000,
      maxFiles: 10,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});
