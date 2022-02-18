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
const Image_class_1 = require("../helpers/Image.class");
const ImageValidator_1 = __importDefault(require("../middlewares/ImageValidator"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const MAIN_IMAGE_EXTENTION = 'png';
router.get('/image', ImageValidator_1.default.validateImageParm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nameOfImage = req.query.name;
        const width = req.query.width;
        const height = req.query.height;
        const img = {
            In_path: Image_class_1.Image.IN_PATH,
            width: width,
            height: height,
            name: `${nameOfImage}.${MAIN_IMAGE_EXTENTION}`,
        };
        const ret = yield Image_class_1.Image.createThumpnails(img);
        const type = 'png';
        const stream = fs_1.default.createReadStream(path_1.default.join(ret === null || ret === void 0 ? void 0 : ret.Out_path, ret === null || ret === void 0 ? void 0 : ret.name));
        stream.on('open', () => {
            res.set('Content-Type', type);
            stream.pipe(res);
            res.statusCode = 200;
        });
        // res.send(`http://localhost:3000/static/out/${ret?.name}`)
        // res.sendStatus(200)
        // res.redirect(`/static/out/${ret?.name}`)
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
