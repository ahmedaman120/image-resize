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
const router = express_1.default.Router();
router.get('/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const MAIN_IMAGE_DIR = '../../utilities/images/';
    try {
        const nameOfImage = req.query.name;
        const width = req.query.width;
        const height = req.query.height;
        console.log(nameOfImage);
        console.log(isNaN(+width));
        console.log(isNaN(+height));
        console.log(path_1.default.join(__dirname, MAIN_IMAGE_DIR, nameOfImage));
        console.log(fs_1.default.existsSync(path_1.default.join(__dirname, MAIN_IMAGE_DIR, nameOfImage)));
        // const file = await fs.promises.open(path.join(MAIN_IMAGE_DIR, nameOfImage),'r');
        // const img  =await fs.promises.readFile(file);
        // console.log(img)
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, MAIN_IMAGE_DIR, nameOfImage))) {
            // check the file not exist in our collection
            return res.status(400).send('Check your inputs well');
        }
        if (isNaN(+width) || isNaN(+height)) {
            // check the input width and height is'n numbers
            return res.status(400).send('Check your inputs well');
        }
        res.send("now we can work well");
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;