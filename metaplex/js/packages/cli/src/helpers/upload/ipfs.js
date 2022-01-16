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
exports.ipfsUpload = void 0;
var loglevel_1 = require("loglevel");
var node_fetch_1 = require("node-fetch");
var ipfs_http_client_1 = require("ipfs-http-client");
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function ipfsUpload(ipfsCredentials, image, manifestBuffer) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenIfps, ipfs, uploadToIpfs, mediaHash, mediaUrl, authIFPS, manifestJson, manifestHash, link;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenIfps = "".concat(ipfsCredentials.projectId, ":").concat(ipfsCredentials.secretKey);
                    ipfs = (0, ipfs_http_client_1.create)('https://ipfs.infura.io:5001');
                    uploadToIpfs = function (source) { return __awaiter(_this, void 0, void 0, function () {
                        var cid;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ipfs.add(source)["catch"]()];
                                case 1:
                                    cid = (_a.sent()).cid;
                                    return [2 /*return*/, cid];
                            }
                        });
                    }); };
                    return [4 /*yield*/, uploadToIpfs((0, ipfs_http_client_1.globSource)(image, { recursive: true }))];
                case 1:
                    mediaHash = _a.sent();
                    loglevel_1["default"].debug('mediaHash:', mediaHash);
                    mediaUrl = "https://ipfs.io/ipfs/".concat(mediaHash);
                    loglevel_1["default"].debug('mediaUrl:', mediaUrl);
                    authIFPS = Buffer.from(tokenIfps).toString('base64');
                    return [4 /*yield*/, (0, node_fetch_1["default"])("https://ipfs.infura.io:5001/api/v0/pin/add?arg=".concat(mediaHash), {
                            headers: {
                                Authorization: "Basic ".concat(authIFPS)
                            },
                            method: 'POST'
                        })];
                case 2:
                    _a.sent();
                    loglevel_1["default"].info('uploaded image for file:', image);
                    return [4 /*yield*/, sleep(500)];
                case 3:
                    _a.sent();
                    manifestJson = JSON.parse(manifestBuffer.toString('utf8'));
                    manifestJson.image = mediaUrl;
                    manifestJson.properties.files = manifestJson.properties.files.map(function (f) {
                        return __assign(__assign({}, f), { uri: mediaUrl });
                    });
                    return [4 /*yield*/, uploadToIpfs(Buffer.from(JSON.stringify(manifestJson)))];
                case 4:
                    manifestHash = _a.sent();
                    return [4 /*yield*/, (0, node_fetch_1["default"])("https://ipfs.infura.io:5001/api/v0/pin/add?arg=".concat(manifestHash), {
                            headers: {
                                Authorization: "Basic ".concat(authIFPS)
                            },
                            method: 'POST'
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sleep(500)];
                case 6:
                    _a.sent();
                    link = "https://ipfs.io/ipfs/".concat(manifestHash);
                    loglevel_1["default"].info('uploaded manifest: ', link);
                    return [2 /*return*/, [link, mediaUrl]];
            }
        });
    });
}
exports.ipfsUpload = ipfsUpload;
