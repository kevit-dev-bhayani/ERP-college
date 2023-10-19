"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
class App {
    constructor(routers) {
        this.routers = routers;
        this.app = (0, express_1.default)();
        this.initializeRoute();
    }
    listen() {
        this.app.listen(config_1.server.port, () => {
            logger_1.logger.info(`app is running on port ${config_1.server.port}`);
        });
    }
    initializeRoute() {
        this.routers.forEach((router) => {
            this.app.use('/', router);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map