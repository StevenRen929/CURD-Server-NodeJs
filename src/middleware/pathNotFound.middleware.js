const getLogger = require("../common/logger");

const logger = getLogger(__filename);

module.exports = (req, res, next) => {
    logger.warn(`request url not found: ${req.originalUrl}`);
    res.formatResponse(`request url not found: ${req.originalUrl}`,404);
};