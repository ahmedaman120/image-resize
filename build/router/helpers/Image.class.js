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
    static createImageName(name, width, height) {
        const imgName = `thumb-${name === null || name === void 0 ? void 0 : name.split('.')[0]}-${width}-${height}.png`;
        return imgName;
    }
    static resize(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imgName = Image.createImageName(image.name, image.width, image.height);
                const out = path_1.default.join(Image.OUT_PATH, imgName).toString();
                const targetImage = path_1.default.join(image.In_path, image.name);
                yield (0, sharp_1.default)(targetImage)
                    .resize(parseInt(image.width), parseInt(image.height))
                    .toFile(out);
                image.name = imgName;
                image.Out_path = Image.OUT_PATH;
                return image;
            }
            catch (error) {
                return null;
            }
        });
    }
    static isImageExist(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                //end if it empty
                return false;
            }
            return (yield Image.getAllImages()).includes(filename); // ['test','test-2'].include(filename)
        });
    }
    static getAllImages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield fs_1.default.promises.readdir(Image.OUT_PATH);
            }
            catch (_a) {
                return [];
            }
        });
    }
    static createThumpnails(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if image exist or not
                const name = Image.createImageName(image.name, image.width, image.height);
                if (yield Image.isImageExist(name)) {
                    image.name = name;
                    image.Out_path = Image.OUT_PATH;
                    return image;
                }
                else {
                    const resized_image = yield Image.resize(image);
                    return resized_image;
                }
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.Image = Image;
Image.OUT_PATH = path_1.default.join(__dirname, '../../../public/out/').toString();
Image.IN_PATH = path_1.default.join(__dirname, '../../../public/images/').toString();
