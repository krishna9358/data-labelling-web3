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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = upload;
const cloudinary_1 = require("cloudinary");
require('dotenv').config();
function upload() {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Configuration
            cloudinary_1.v2.config({
                cloud_name: process.env.cloudnary_cloud_name,
                api_key: process.env.cloudnary_api_key,
                api_secret: process.env.cloudnary_api_secret
            });
            // Upload an image
            const uploadResult = yield cloudinary_1.v2.uploader
                .upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
                public_id: 'shoes',
            })
                .catch((error) => {
                console.log(error);
            });
            console.log(uploadResult);
        });
    })();
}
