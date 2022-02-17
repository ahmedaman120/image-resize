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
exports.Image = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Image {
    static getImage(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!img.name) {
                return null;
            }
            const filePath = path_1.default.resolve(Image.OUT_PATH, img.name);
            try {
                yield fs_1.default.promises.access(filePath);
                return filePath;
            }
            catch (error) {
                return null;
            }
        });
    }
    static resize(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imgName = `img-${Date.now()}.png`;
                const out = path_1.default.join(Image.OUT_PATH, imgName).toString();
                console.log(image);
                const targetImage = path_1.default.join(image.In_path, image.name);
                console.log(targetImage);
                yield (0, sharp_1.default)(targetImage)
                    .resize(+image.width, +image.height)
                    .toFile(out);
                image.name = imgName;
                image.Out_path = Image.OUT_PATH;
                console.log(image);
                return 'success';
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    static isImageAvailable(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return false; // Fail early
            }
            return (yield Image.getAvailableImageNames()).includes(filename);
        });
    }
    static getAvailableImageNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield fs_1.default.promises.readdir(Image.IN_PATH)).map((filename) => filename.split('.')[0]);
            }
            catch (_a) {
                return [];
            }
        });
    }
}
exports.Image = Image;
Image.OUT_PATH = path_1.default.join(__dirname, '../../public/out/').toString();
Image.IN_PATH = path_1.default.join(__dirname, '../../public/images/').toString();
