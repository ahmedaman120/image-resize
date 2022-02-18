"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const api_1 = __importDefault(require("./router/api"));
// import morgan from 'morgan'
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Image_class_1 = require("./router/helpers/Image.class");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// app.use(morgan('combined'))
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../public')));
const port = 3000;
app.use('/api', api_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('hello to server form ts')
    if (yield fs_1.default.existsSync(Image_class_1.Image.OUT_PATH)) {
        return 0;
    }
    fs_1.default.mkdirSync(Image_class_1.Image.OUT_PATH);
    return 1;
}));
exports.default = app;
