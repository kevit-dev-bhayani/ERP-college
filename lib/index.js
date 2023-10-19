"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const ping_1 = require("./ping");
const app = new app_1.App([ping_1.router]);
app.listen();
//# sourceMappingURL=index.js.map