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
/* eslint-disable prettier/prettier */
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Image_class_1 = require("../helpers/Image.class");
const router = express_1.default.Router();
function createImg(img) {
    return img;
}
router.get('/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const MAIN_IMAGE_DIR = '../../public/images/';
    try {
        const nameOfImage = req.query.name;
        const width = req.query.width;
        const height = req.query.height;
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, MAIN_IMAGE_DIR, nameOfImage))) {
            // check the file not exist in our collection
            return res.status(400).send('Check your inputs well');
        }
        if (isNaN(+width) || isNaN(+height)) {
            // check the input width and height is'n numbers
            return res.status(400).send('Check your inputs well');
        }
        const img = {
            In_path: Image_class_1.Image.IN_PATH,
            width: width,
            height: height,
            name: nameOfImage
        };
        const ret = yield Image_class_1.Image.resize(img);
        console.log(ret);
        res.send("now we can work well");
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
