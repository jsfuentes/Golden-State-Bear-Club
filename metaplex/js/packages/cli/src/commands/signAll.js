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
exports.delay = exports.getAccountsByCreatorAddress = exports.signAllMetadataFromCandyMachine = void 0;
var web3_js_1 = require("@solana/web3.js");
var transactions_1 = require("../helpers/transactions");
var borsh = require("borsh");
var constants_1 = require("../helpers/constants");
var types_1 = require("../types");
var sign_1 = require("./sign");
var loglevel_1 = require("loglevel");
var various_1 = require("../helpers/various");
var SIGNING_INTERVAL = 60 * 1000; //60s
var lastCount = 0;
/*
 Get accounts by candy machine creator address
 Get only verified ones
 Get only unverified ones with creator address
 Grab n at a time and batch sign and send transaction

 PS: Don't sign candy machine addresses that you do not know about. Signing verifies your participation.
*/
function signAllMetadataFromCandyMachine(connection, wallet, candyMachineAddress, batchSize, daemon) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!daemon) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1: return [4 /*yield*/, findAndSignMetadata(candyMachineAddress, connection, wallet, batchSize)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, various_1.sleep)(SIGNING_INTERVAL)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, findAndSignMetadata(candyMachineAddress, connection, wallet, batchSize)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.signAllMetadataFromCandyMachine = signAllMetadataFromCandyMachine;
function findAndSignMetadata(candyMachineAddress, connection, wallet, batchSize) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataByCandyMachine, candyVerifiedListToSign;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAccountsByCreatorAddress(candyMachineAddress, connection)];
                case 1:
                    metadataByCandyMachine = _a.sent();
                    if (lastCount === metadataByCandyMachine.length) {
                        loglevel_1["default"].debug("Didn't find any new NFTs to sign - ".concat(new Date()));
                        return [2 /*return*/];
                    }
                    lastCount = metadataByCandyMachine.length;
                    loglevel_1["default"].info("Found ".concat(metadataByCandyMachine.length, " nft's minted by candy machine ").concat(candyMachineAddress));
                    return [4 /*yield*/, getCandyMachineVerifiedMetadata(metadataByCandyMachine, candyMachineAddress, wallet.publicKey.toBase58())];
                case 2:
                    candyVerifiedListToSign = _a.sent();
                    loglevel_1["default"].info("Found ".concat(candyVerifiedListToSign.length, " nft's to sign by  ").concat(wallet.publicKey.toBase58()));
                    return [4 /*yield*/, sendSignMetadata(connection, wallet, candyVerifiedListToSign, batchSize)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getAccountsByCreatorAddress(creatorAddress, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataAccounts, decodedAccounts, i, e, decoded, accountPubkey, store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProgramAccounts(connection, constants_1.TOKEN_METADATA_PROGRAM_ID.toBase58(), {
                        filters: [
                            {
                                memcmp: {
                                    offset: 1 + // key
                                        32 + // update auth
                                        32 + // mint
                                        4 + // name string length
                                        constants_1.MAX_NAME_LENGTH + // name
                                        4 + // uri string length
                                        constants_1.MAX_URI_LENGTH + // uri*
                                        4 + // symbol string length
                                        constants_1.MAX_SYMBOL_LENGTH + // symbol
                                        2 + // seller fee basis points
                                        1 + // whether or not there is a creators vec
                                        4 + // creators vec length
                                        0 * constants_1.MAX_CREATOR_LEN,
                                    bytes: creatorAddress
                                }
                            },
                        ]
                    })];
                case 1:
                    metadataAccounts = _a.sent();
                    decodedAccounts = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < metadataAccounts.length)) return [3 /*break*/, 5];
                    e = metadataAccounts[i];
                    return [4 /*yield*/, decodeMetadata(e.account.data)];
                case 3:
                    decoded = _a.sent();
                    accountPubkey = e.pubkey;
                    store = [decoded, accountPubkey];
                    decodedAccounts.push(store);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, decodedAccounts];
            }
        });
    });
}
exports.getAccountsByCreatorAddress = getAccountsByCreatorAddress;
function getProgramAccounts(connection, programId, configOrCommitment) {
    return __awaiter(this, void 0, void 0, function () {
        var extra, commitment, args, unsafeRes, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    extra = {};
                    //let encoding;
                    if (configOrCommitment) {
                        if (typeof configOrCommitment === 'string') {
                            commitment = configOrCommitment;
                        }
                        else {
                            commitment = configOrCommitment.commitment;
                            //encoding = configOrCommitment.encoding;
                            if (configOrCommitment.dataSlice) {
                                extra.dataSlice = configOrCommitment.dataSlice;
                            }
                            if (configOrCommitment.filters) {
                                extra.filters = configOrCommitment.filters;
                            }
                        }
                    }
                    args = connection._buildArgs([programId], commitment, 'base64', extra);
                    return [4 /*yield*/, connection._rpcRequest('getProgramAccounts', args)];
                case 1:
                    unsafeRes = _a.sent();
                    data = unsafeRes.result.map(function (item) {
                        return {
                            account: {
                                // TODO: possible delay parsing could be added here
                                data: Buffer.from(item.account.data[0], 'base64'),
                                executable: item.account.executable,
                                lamports: item.account.lamports,
                                // TODO: maybe we can do it in lazy way? or just use string
                                owner: item.account.owner
                            },
                            pubkey: item.pubkey
                        };
                    });
                    return [2 /*return*/, data];
            }
        });
    });
}
// eslint-disable-next-line no-control-regex
var METADATA_REPLACE = new RegExp('\u0000', 'g');
function decodeMetadata(buffer) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata;
        return __generator(this, function (_a) {
            metadata = borsh.deserializeUnchecked(types_1.METADATA_SCHEMA, types_1.Metadata, buffer);
            metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
            metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
            metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
            return [2 /*return*/, metadata];
        });
    });
}
function getCandyMachineVerifiedMetadata(metadataList, candyAddress, creatorAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var verifiedList;
        return __generator(this, function (_a) {
            verifiedList = [];
            metadataList.forEach(function (meta) {
                var verifiedCandy = false;
                var verifiedCreator = true;
                meta[0].data.creators.forEach(function (creator) {
                    if (new web3_js_1.PublicKey(creator.address).toBase58() == candyAddress &&
                        creator.verified === 1) {
                        verifiedCandy = true;
                    }
                    if (new web3_js_1.PublicKey(creator.address).toBase58() == creatorAddress &&
                        creator.verified === 0) {
                        verifiedCreator = false;
                    }
                });
                if (verifiedCandy && !verifiedCreator) {
                    verifiedList.push(meta);
                }
            });
            return [2 /*return*/, verifiedList];
        });
    });
}
function sendSignMetadata(connection, wallet, metadataList, batchsize) {
    return __awaiter(this, void 0, void 0, function () {
        var total, sliceAmount, removed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    total = 0;
                    _a.label = 1;
                case 1:
                    if (!(metadataList.length > 0)) return [3 /*break*/, 4];
                    loglevel_1["default"].debug('Signing metadata ');
                    sliceAmount = batchsize;
                    if (metadataList.length < batchsize) {
                        sliceAmount = metadataList.length;
                    }
                    removed = metadataList.splice(0, sliceAmount);
                    total += sliceAmount;
                    return [4 /*yield*/, delay(500)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, signMetadataBatch(removed, connection, wallet)];
                case 3:
                    _a.sent();
                    loglevel_1["default"].debug("Processed ".concat(total, " nfts"));
                    return [3 /*break*/, 1];
                case 4:
                    loglevel_1["default"].info("Finished signing metadata for ".concat(total, " NFTs"));
                    return [2 /*return*/];
            }
        });
    });
}
function signMetadataBatch(metadataList, connection, keypair) {
    return __awaiter(this, void 0, void 0, function () {
        var instructions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instructions = metadataList.map(function (meta) {
                        return (0, sign_1.signMetadataInstruction)(new web3_js_1.PublicKey(meta[1]), keypair.publicKey);
                    });
                    return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(connection, keypair, instructions, [], 'single')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.delay = delay;
