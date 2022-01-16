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
exports.updateMetadataFromCache = exports.updateFromCache = void 0;
var web3_js_1 = require("@solana/web3.js");
var transactions_1 = require("../helpers/transactions");
var borsh_1 = require("borsh");
var loglevel_1 = require("loglevel");
var various_1 = require("../helpers/various");
var signAll_1 = require("./signAll");
var instructions_1 = require("../helpers/instructions");
var schema_1 = require("../helpers/schema");
var SIGNING_INTERVAL = 60 * 1000; //60s
function updateFromCache(connection, wallet, candyMachineAddress, batchSize, daemon, cacheContent, newCacheContent) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!daemon) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1: return [4 /*yield*/, updateMetadataFromCache(candyMachineAddress, connection, wallet, batchSize, cacheContent, newCacheContent)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, various_1.sleep)(SIGNING_INTERVAL)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, updateMetadataFromCache(candyMachineAddress, connection, wallet, batchSize, cacheContent, newCacheContent)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateFromCache = updateFromCache;
function updateMetadataFromCache(candyMachineAddress, connection, wallet, batchSize, cacheContent, newCacheContent) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataByCandyMachine, differences, i, toUpdate, total, sliceAmount, removed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, signAll_1.getAccountsByCreatorAddress)(candyMachineAddress, connection)];
                case 1:
                    metadataByCandyMachine = _a.sent();
                    differences = {};
                    for (i = 0; i < Object.keys(cacheContent.items).length; i++) {
                        if (cacheContent.items[i.toString()].link !=
                            newCacheContent.items[i.toString()].link) {
                            differences[cacheContent.items[i.toString()].link] =
                                newCacheContent.items[i.toString()].link;
                        }
                    }
                    toUpdate = metadataByCandyMachine.filter(function (m) { return !!differences[m[0].data.uri]; });
                    loglevel_1["default"].info('Found', toUpdate.length, 'uris to update');
                    total = 0;
                    _a.label = 2;
                case 2:
                    if (!(toUpdate.length > 0)) return [3 /*break*/, 5];
                    loglevel_1["default"].debug('Signing metadata ');
                    sliceAmount = batchSize;
                    if (toUpdate.length < batchSize) {
                        sliceAmount = toUpdate.length;
                    }
                    removed = toUpdate.splice(0, sliceAmount);
                    total += sliceAmount;
                    return [4 /*yield*/, (0, signAll_1.delay)(500)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, updateMetadataBatch(removed, connection, wallet, differences)];
                case 4:
                    _a.sent();
                    loglevel_1["default"].debug("Processed ".concat(total, " nfts"));
                    return [3 /*break*/, 2];
                case 5:
                    loglevel_1["default"].info("Finished signing metadata for ".concat(total, " NFTs"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateMetadataFromCache = updateMetadataFromCache;
function updateMetadataBatch(metadataList, connection, keypair, differences) {
    return __awaiter(this, void 0, void 0, function () {
        var instructions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instructions = metadataList.map(function (meta) {
                        var newData = new schema_1.Data(__assign(__assign({}, meta[0].data), { creators: meta[0].data.creators.map(function (c) {
                                return new schema_1.Creator(__assign(__assign({}, c), { address: new web3_js_1.PublicKey(c.address).toBase58() }));
                            }), uri: differences[meta[0].data.uri] }));
                        var value = new schema_1.UpdateMetadataArgs({
                            data: newData,
                            updateAuthority: keypair.publicKey.toBase58(),
                            primarySaleHappened: null
                        });
                        var txnData = Buffer.from((0, borsh_1.serialize)(schema_1.METADATA_SCHEMA, value));
                        return (0, instructions_1.createUpdateMetadataInstruction)(new web3_js_1.PublicKey(meta[1]), keypair.publicKey, txnData);
                    });
                    return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(connection, keypair, instructions, [], 'single')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
