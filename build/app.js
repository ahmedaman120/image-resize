"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const api_1 = __importDefault(require("./router/api"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('combined'));
const port = 3000;
app.use('/api', api_1.default);
app.listen(port, () => {
    // console.log('hello to server form ts')
    return 0;
});
exports.default = app;
