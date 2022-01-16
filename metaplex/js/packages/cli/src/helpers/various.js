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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.parseUses = exports.getCluster = exports.getPriceWithMantissa = exports.getMetadata = exports.generateRandoms = exports.chunks = exports.getMultipleAccounts = exports.parseDate = exports.parsePrice = exports.fromUTF8Array = exports.sleep = exports.getUnixTs = exports.generateRandomSet = exports.assertValidBreakdown = exports.shuffle = exports.readJsonFile = exports.getCandyMachineV2Config = void 0;
var web3_js_1 = require("@solana/web3.js");
var fs_1 = require("fs");
var weighted_1 = require("weighted");
var path_1 = require("path");
var anchor_1 = require("@project-serum/anchor");
var spl_token_1 = require("@solana/spl-token");
var accounts_1 = require("./accounts");
var constants_1 = require("./constants");
var mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var readFile = fs_1["default"].promises.readFile;
function getCandyMachineV2Config(walletKeyPair, anchorProgram, configPath) {
    return __awaiter(this, void 0, void 0, function () {
        var configString, config, storage, ipfsInfuraProjectId, number, ipfsInfuraSecret, awsS3Bucket, noRetainAuthority, noMutable, batchSize, price, splToken, splTokenAccount, solTreasuryAccount, gatekeeper, endSettings, hiddenSettings, whitelistMintSettings, goLiveDate, uuid, arweaveJwk, wallet, parsedPrice, splTokenAccountFigured, _a, _b, splTokenKey, splTokenAccountKey, token, mintInfo, tokenAccount, utf8Encode;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (configPath === undefined) {
                        throw new Error('The configPath is undefined');
                    }
                    configString = fs_1["default"].readFileSync(configPath);
                    config = JSON.parse(configString);
                    storage = config.storage, ipfsInfuraProjectId = config.ipfsInfuraProjectId, number = config.number, ipfsInfuraSecret = config.ipfsInfuraSecret, awsS3Bucket = config.awsS3Bucket, noRetainAuthority = config.noRetainAuthority, noMutable = config.noMutable, batchSize = config.batchSize, price = config.price, splToken = config.splToken, splTokenAccount = config.splTokenAccount, solTreasuryAccount = config.solTreasuryAccount, gatekeeper = config.gatekeeper, endSettings = config.endSettings, hiddenSettings = config.hiddenSettings, whitelistMintSettings = config.whitelistMintSettings, goLiveDate = config.goLiveDate, uuid = config.uuid, arweaveJwk = config.arweaveJwk;
                    parsedPrice = price;
                    if (!splTokenAccount) return [3 /*break*/, 1];
                    _a = splTokenAccount;
                    return [3 /*break*/, 5];
                case 1:
                    if (!splToken) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, accounts_1.getAtaForMint)(new anchor_1.web3.PublicKey(splToken), walletKeyPair.publicKey)];
                case 2:
                    _b = (_c.sent())[0];
                    return [3 /*break*/, 4];
                case 3:
                    _b = null;
                    _c.label = 4;
                case 4:
                    _a = _b;
                    _c.label = 5;
                case 5:
                    splTokenAccountFigured = _a;
                    if (!splToken) return [3 /*break*/, 8];
                    if (solTreasuryAccount) {
                        throw new Error('If spl-token-account or spl-token is set then sol-treasury-account cannot be set');
                    }
                    if (!splToken) {
                        throw new Error('If spl-token-account is set, spl-token must also be set');
                    }
                    splTokenKey = new anchor_1.web3.PublicKey(splToken);
                    splTokenAccountKey = new anchor_1.web3.PublicKey(splTokenAccountFigured);
                    if (!splTokenAccountFigured) {
                        throw new Error('If spl-token is set, spl-token-account must also be set');
                    }
                    token = new spl_token_1.Token(anchorProgram.provider.connection, splTokenKey, spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
                    return [4 /*yield*/, token.getMintInfo()];
                case 6:
                    mintInfo = _c.sent();
                    if (!mintInfo.isInitialized) {
                        throw new Error("The specified spl-token is not initialized");
                    }
                    return [4 /*yield*/, token.getAccountInfo(splTokenAccountKey)];
                case 7:
                    tokenAccount = _c.sent();
                    if (!tokenAccount.isInitialized) {
                        throw new Error("The specified spl-token-account is not initialized");
                    }
                    if (!tokenAccount.mint.equals(splTokenKey)) {
                        throw new Error("The spl-token-account's mint (".concat(tokenAccount.mint.toString(), ") does not match specified spl-token ").concat(splTokenKey.toString()));
                    }
                    wallet = new anchor_1.web3.PublicKey(splTokenAccountKey);
                    parsedPrice = price * Math.pow(10, mintInfo.decimals);
                    if (whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) {
                        whitelistMintSettings.discountPrice *= Math.pow(10, mintInfo.decimals);
                    }
                    return [3 /*break*/, 9];
                case 8:
                    parsedPrice = price * Math.pow(10, 9);
                    if (whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) {
                        whitelistMintSettings.discountPrice *= Math.pow(10, 9);
                    }
                    wallet = solTreasuryAccount
                        ? new anchor_1.web3.PublicKey(solTreasuryAccount)
                        : walletKeyPair.publicKey;
                    _c.label = 9;
                case 9:
                    if (whitelistMintSettings) {
                        whitelistMintSettings.mint = new anchor_1.web3.PublicKey(whitelistMintSettings.mint);
                        if (whitelistMintSettings === null || whitelistMintSettings === void 0 ? void 0 : whitelistMintSettings.discountPrice) {
                            whitelistMintSettings.discountPrice = new anchor_1.BN(whitelistMintSettings.discountPrice);
                        }
                    }
                    if (endSettings) {
                        if (endSettings.endSettingType.date) {
                            endSettings.number = new anchor_1.BN(parseDate(endSettings.value));
                        }
                        else if (endSettings.endSettingType.amount) {
                            endSettings.number = new anchor_1.BN(endSettings.value);
                        }
                        delete endSettings.value;
                    }
                    if (hiddenSettings) {
                        utf8Encode = new TextEncoder();
                        hiddenSettings.hash = utf8Encode.encode(hiddenSettings.hash);
                    }
                    if (gatekeeper) {
                        gatekeeper.gatekeeperNetwork = new anchor_1.web3.PublicKey(gatekeeper.gatekeeperNetwork);
                    }
                    return [2 /*return*/, {
                            storage: storage,
                            ipfsInfuraProjectId: ipfsInfuraProjectId,
                            number: number,
                            ipfsInfuraSecret: ipfsInfuraSecret,
                            awsS3Bucket: awsS3Bucket,
                            retainAuthority: !noRetainAuthority,
                            mutable: !noMutable,
                            batchSize: batchSize,
                            price: new anchor_1.BN(parsedPrice),
                            treasuryWallet: wallet,
                            splToken: splToken ? new anchor_1.web3.PublicKey(splToken) : null,
                            gatekeeper: gatekeeper,
                            endSettings: endSettings,
                            hiddenSettings: hiddenSettings,
                            whitelistMintSettings: whitelistMintSettings,
                            goLiveDate: goLiveDate ? new anchor_1.BN(parseDate(goLiveDate)) : null,
                            uuid: uuid,
                            arweaveJwk: arweaveJwk
                        }];
            }
        });
    });
}
exports.getCandyMachineV2Config = getCandyMachineV2Config;
function readJsonFile(fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile(fileName, 'utf-8')];
                case 1:
                    file = _a.sent();
                    return [2 /*return*/, JSON.parse(file)];
            }
        });
    });
}
exports.readJsonFile = readJsonFile;
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
exports.shuffle = shuffle;
var assertValidBreakdown = function (breakdown) {
    var total = Object.values(breakdown).reduce(function (sum, el) { return (sum += el); }, 0);
    if (total > 101 || total < 99) {
        console.log(breakdown);
        throw new Error('Breakdown not within 1% of 100! It is: ' + total);
    }
};
exports.assertValidBreakdown = assertValidBreakdown;
var generateRandomSet = function (breakdown, dnp) {
    var valid = true;
    var tmp = {};
    var _loop_1 = function () {
        valid = true;
        var keys = shuffle(Object.keys(breakdown));
        keys.forEach(function (attr) {
            var breakdownToUse = breakdown[attr];
            var formatted = Object.keys(breakdownToUse).reduce(function (f, key) {
                if (breakdownToUse[key]['baseValue']) {
                    f[key] = breakdownToUse[key]['baseValue'];
                }
                else {
                    f[key] = breakdownToUse[key];
                }
                return f;
            }, {});
            (0, exports.assertValidBreakdown)(formatted);
            var randomSelection = weighted_1["default"].select(formatted);
            tmp[attr] = randomSelection;
        });
        keys.forEach(function (attr) {
            var breakdownToUse = breakdown[attr];
            keys.forEach(function (otherAttr) {
                if (tmp[otherAttr] &&
                    typeof breakdown[otherAttr][tmp[otherAttr]] != 'number' &&
                    breakdown[otherAttr][tmp[otherAttr]][attr]) {
                    breakdownToUse = breakdown[otherAttr][tmp[otherAttr]][attr];
                    console.log('Because this item got attr', tmp[otherAttr], 'we are using different probabilites for', attr);
                    (0, exports.assertValidBreakdown)(breakdownToUse);
                    var randomSelection = weighted_1["default"].select(breakdownToUse);
                    tmp[attr] = randomSelection;
                }
            });
        });
        Object.keys(tmp).forEach(function (attr1) {
            Object.keys(tmp).forEach(function (attr2) {
                if (dnp[attr1] &&
                    dnp[attr1][tmp[attr1]] &&
                    dnp[attr1][tmp[attr1]][attr2] &&
                    dnp[attr1][tmp[attr1]][attr2].includes(tmp[attr2])) {
                    console.log('Not including', tmp[attr1], tmp[attr2], 'together');
                    valid = false;
                    tmp = {};
                }
            });
        });
    };
    do {
        _loop_1();
    } while (!valid);
    return tmp;
};
exports.generateRandomSet = generateRandomSet;
var getUnixTs = function () {
    return new Date().getTime() / 1000;
};
exports.getUnixTs = getUnixTs;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function fromUTF8Array(data) {
    // array of bytes
    var str = '', i;
    for (i = 0; i < data.length; i++) {
        var value = data[i];
        if (value < 0x80) {
            str += String.fromCharCode(value);
        }
        else if (value > 0xbf && value < 0xe0) {
            str += String.fromCharCode(((value & 0x1f) << 6) | (data[i + 1] & 0x3f));
            i += 1;
        }
        else if (value > 0xdf && value < 0xf0) {
            str += String.fromCharCode(((value & 0x0f) << 12) |
                ((data[i + 1] & 0x3f) << 6) |
                (data[i + 2] & 0x3f));
            i += 2;
        }
        else {
            // surrogate pair
            var charCode = (((value & 0x07) << 18) |
                ((data[i + 1] & 0x3f) << 12) |
                ((data[i + 2] & 0x3f) << 6) |
                (data[i + 3] & 0x3f)) -
                0x010000;
            str += String.fromCharCode((charCode >> 10) | 0xd800, (charCode & 0x03ff) | 0xdc00);
            i += 3;
        }
    }
    return str;
}
exports.fromUTF8Array = fromUTF8Array;
function parsePrice(price, mantissa) {
    if (mantissa === void 0) { mantissa = web3_js_1.LAMPORTS_PER_SOL; }
    return Math.ceil(parseFloat(price) * mantissa);
}
exports.parsePrice = parsePrice;
function parseDate(date) {
    if (date === 'now') {
        return Date.now() / 1000;
    }
    return Date.parse(date) / 1000;
}
exports.parseDate = parseDate;
var getMultipleAccounts = function (connection, keys, commitment) { return __awaiter(void 0, void 0, void 0, function () {
    var result, array;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(chunks(keys, 99).map(function (chunk) {
                    return getMultipleAccountsCore(connection, chunk, commitment);
                }))];
            case 1:
                result = _a.sent();
                array = result
                    .map(function (a) {
                    //@ts-ignore
                    return a.array.map(function (acc) {
                        if (!acc) {
                            return undefined;
                        }
                        var data = acc.data, rest = __rest(acc, ["data"]);
                        var obj = __assign(__assign({}, rest), { data: Buffer.from(data[0], 'base64') });
                        return obj;
                    });
                })
                    //@ts-ignore
                    .flat();
                return [2 /*return*/, { keys: keys, array: array }];
        }
    });
}); };
exports.getMultipleAccounts = getMultipleAccounts;
function chunks(array, size) {
    return Array.apply(0, new Array(Math.ceil(array.length / size))).map(function (_, index) { return array.slice(index * size, (index + 1) * size); });
}
exports.chunks = chunks;
function generateRandoms(numberOfAttrs, total) {
    if (numberOfAttrs === void 0) { numberOfAttrs = 1; }
    if (total === void 0) { total = 100; }
    var numbers = [];
    var loose_percentage = total / numberOfAttrs;
    for (var i = 0; i < numberOfAttrs; i++) {
        var random = Math.floor(Math.random() * loose_percentage) + 1;
        numbers.push(random);
    }
    var sum = numbers.reduce(function (prev, cur) {
        return prev + cur;
    }, 0);
    numbers.push(total - sum);
    return numbers;
}
exports.generateRandoms = generateRandoms;
var getMetadata = function (name, symbol, index, creators, description, seller_fee_basis_points, attrs, collection, treatAttributesAsFileNames) {
    if (name === void 0) { name = ''; }
    if (symbol === void 0) { symbol = ''; }
    if (index === void 0) { index = 0; }
    if (description === void 0) { description = ''; }
    if (seller_fee_basis_points === void 0) { seller_fee_basis_points = 500; }
    var attributes = [];
    for (var prop in attrs) {
        attributes.push({
            trait_type: prop,
            value: treatAttributesAsFileNames
                ? path_1["default"].parse(attrs[prop]).name
                : attrs[prop]
        });
    }
    return {
        name: "".concat(name).concat(index + 1),
        symbol: symbol,
        image: "".concat(index, ".png"),
        properties: {
            files: [
                {
                    uri: "".concat(index, ".png"),
                    type: 'image/png'
                },
            ],
            category: 'image',
            creators: creators
        },
        description: description,
        seller_fee_basis_points: seller_fee_basis_points,
        attributes: attributes,
        collection: collection
    };
};
exports.getMetadata = getMetadata;
var getMultipleAccountsCore = function (connection, keys, commitment) { return __awaiter(void 0, void 0, void 0, function () {
    var args, unsafeRes, array;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                args = connection._buildArgs([keys], commitment, 'base64');
                return [4 /*yield*/, connection._rpcRequest('getMultipleAccounts', args)];
            case 1:
                unsafeRes = _a.sent();
                if (unsafeRes.error) {
                    throw new Error('failed to get info about account ' + unsafeRes.error.message);
                }
                if (unsafeRes.result.value) {
                    array = unsafeRes.result.value;
                    return [2 /*return*/, { keys: keys, array: array }];
                }
                // TODO: fix
                throw new Error();
        }
    });
}); };
var getPriceWithMantissa = function (price, mint, walletKeyPair, anchorProgram) { return __awaiter(void 0, void 0, void 0, function () {
    var token, mintInfo, mantissa;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = new spl_token_1.Token(anchorProgram.provider.connection, new anchor_1.web3.PublicKey(mint), spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
                return [4 /*yield*/, token.getMintInfo()];
            case 1:
                mintInfo = _a.sent();
                mantissa = Math.pow(10, mintInfo.decimals);
                return [2 /*return*/, Math.ceil(price * mantissa)];
        }
    });
}); };
exports.getPriceWithMantissa = getPriceWithMantissa;
function getCluster(name) {
    for (var _i = 0, CLUSTERS_1 = constants_1.CLUSTERS; _i < CLUSTERS_1.length; _i++) {
        var cluster = CLUSTERS_1[_i];
        if (cluster.name === name) {
            return cluster.url;
        }
    }
    return constants_1.DEFAULT_CLUSTER.url;
}
exports.getCluster = getCluster;
function parseUses(useMethod, total) {
    if (!!useMethod && !!total) {
        var realUseMethod = mpl_token_metadata_1.UseMethod[useMethod];
        if (!realUseMethod) {
            throw new Error("Invalid use method: ".concat(useMethod));
        }
        return new mpl_token_metadata_1.Uses({ useMethod: realUseMethod, total: total, remaining: total });
    }
    return null;
}
exports.parseUses = parseUses;
