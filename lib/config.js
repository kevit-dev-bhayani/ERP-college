"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const { PORT, LOG_LEVEL } = process.env;
exports.server = {
    port: PORT || 3000,
    logLevel: LOG_LEVEL || 'info'
};
//# sourceMappingURL=config.js.map