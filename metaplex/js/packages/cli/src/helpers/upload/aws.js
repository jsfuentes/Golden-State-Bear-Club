"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.awsUpload = void 0;
var loglevel_1 = require("loglevel");
var path_1 = require("path");
var fs_1 = require("fs");
var client_s3_1 = require("@aws-sdk/client-s3");
var path_2 = require("path");
var mime_1 = require("mime");
function uploadFile(s3Client, awsS3Bucket, filename, contentType, body) {
    return __awaiter(this, void 0, void 0, function () {
        var mediaUploadParams, err_1, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mediaUploadParams = {
                        Bucket: awsS3Bucket,
                        Key: filename,
                        Body: body,
                        ACL: 'public-read',
                        ContentType: contentType
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, s3Client.send(new client_s3_1.PutObjectCommand(mediaUploadParams))];
                case 2:
                    _a.sent();
                    loglevel_1["default"].info('uploaded filename:', filename);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    loglevel_1["default"].debug('Error', err_1);
                    return [3 /*break*/, 4];
                case 4:
                    url = "https://".concat(awsS3Bucket, ".s3.amazonaws.com/").concat(filename);
                    loglevel_1["default"].debug('Location:', url);
                    return [2 /*return*/, url];
            }
        });
    });
}
function awsUpload(awsS3Bucket, file, manifestBuffer) {
    return __awaiter(this, void 0, void 0, function () {
        var REGION, s3Client, filename, imageExt, fileStream, mediaUrl, manifestJson, updatedManifestBuffer, extensionRegex, metadataFilename, metadataUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    REGION = 'us-east-1';
                    s3Client = new client_s3_1.S3Client({ region: REGION });
                    filename = "assets/".concat((0, path_1.basename)(file));
                    loglevel_1["default"].debug('file:', file);
                    loglevel_1["default"].debug('filename:', filename);
                    imageExt = path_2["default"].extname(file);
                    fileStream = (0, fs_1.createReadStream)(file);
                    return [4 /*yield*/, uploadFile(s3Client, awsS3Bucket, filename, (0, mime_1.getType)(file), fileStream)];
                case 1:
                    mediaUrl = _a.sent();
                    manifestJson = JSON.parse(manifestBuffer.toString('utf8'));
                    manifestJson.image = mediaUrl;
                    manifestJson.properties.files = manifestJson.properties.files.map(function (f) {
                        return __assign(__assign({}, f), { uri: mediaUrl });
                    });
                    updatedManifestBuffer = Buffer.from(JSON.stringify(manifestJson));
                    extensionRegex = new RegExp("".concat(imageExt, "$"));
                    metadataFilename = filename.replace(extensionRegex, '.json');
                    return [4 /*yield*/, uploadFile(s3Client, awsS3Bucket, metadataFilename, 'application/json', updatedManifestBuffer)];
                case 2:
                    metadataUrl = _a.sent();
                    return [2 /*return*/, [metadataUrl, mediaUrl]];
            }
        });
    });
}
exports.awsUpload = awsUpload;
