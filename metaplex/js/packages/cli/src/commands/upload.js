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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.upload = exports.uploadV2 = void 0;
var promises_1 = require("fs/promises");
var path_1 = require("path");
var loglevel_1 = require("loglevel");
var accounts_1 = require("../helpers/accounts");
var web3_js_1 = require("@solana/web3.js");
var fs_1 = require("fs");
var anchor_1 = require("@project-serum/anchor");
var cache_1 = require("../helpers/cache");
var arweave_1 = require("../helpers/upload/arweave");
var arweave_bundle_1 = require("../helpers/upload/arweave-bundle");
var aws_1 = require("../helpers/upload/aws");
var ipfs_1 = require("../helpers/upload/ipfs");
var storage_type_1 = require("../helpers/storage-type");
var various_1 = require("../helpers/various");
function uploadV2(_a) {
    var _b, _c;
    var files = _a.files, cacheName = _a.cacheName, env = _a.env, totalNFTs = _a.totalNFTs, storage = _a.storage, retainAuthority = _a.retainAuthority, mutable = _a.mutable, ipfsCredentials = _a.ipfsCredentials, awsS3Bucket = _a.awsS3Bucket, batchSize = _a.batchSize, price = _a.price, treasuryWallet = _a.treasuryWallet, splToken = _a.splToken, gatekeeper = _a.gatekeeper, goLiveDate = _a.goLiveDate, endSettings = _a.endSettings, whitelistMintSettings = _a.whitelistMintSettings, hiddenSettings = _a.hiddenSettings, uuid = _a.uuid, walletKeyPair = _a.walletKeyPair, anchorProgram = _a.anchorProgram, arweaveJwk = _a.arweaveJwk;
    return __awaiter(this, void 0, void 0, function () {
        var uploadSuccessful, savedContent, cacheContent, dedupedAssetKeys, SIZE, dirname, candyMachine, firstAssetKey, firstAssetManifest, remainingAccounts, splTokenKey, res, exx_1, arweaveBundleUploadGenerator, _d, _e, _f, _g, _h, result, _j, cacheKeys, arweavePathManifestLinks, updatedManifests, lastPrinted_1, tick_1, keys, e_1;
        var _this = this;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    uploadSuccessful = true;
                    savedContent = (0, cache_1.loadCache)(cacheName, env);
                    cacheContent = savedContent || {};
                    if (!cacheContent.program) {
                        cacheContent.program = {};
                    }
                    if (!cacheContent.items) {
                        cacheContent.items = {};
                    }
                    dedupedAssetKeys = getAssetKeysNeedingUpload(cacheContent.items, files);
                    SIZE = dedupedAssetKeys.length;
                    dirname = path_1["default"].dirname(files[0]);
                    candyMachine = cacheContent.program.candyMachine
                        ? new web3_js_1.PublicKey(cacheContent.program.candyMachine)
                        : undefined;
                    if (!!cacheContent.program.uuid) return [3 /*break*/, 5];
                    firstAssetKey = dedupedAssetKeys[0];
                    firstAssetManifest = getAssetManifest(dirname, firstAssetKey.index.includes('json')
                        ? firstAssetKey.index
                        : "".concat(firstAssetKey.index, ".json"));
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 3, , 4]);
                    remainingAccounts = [];
                    if (splToken) {
                        splTokenKey = new web3_js_1.PublicKey(splToken);
                        remainingAccounts.push({
                            pubkey: splTokenKey,
                            isWritable: false,
                            isSigner: false
                        });
                    }
                    if (!((_c = (_b = firstAssetManifest.properties) === null || _b === void 0 ? void 0 : _b.creators) === null || _c === void 0 ? void 0 : _c.every(function (creator) { return creator.address !== undefined; }))) {
                        throw new Error('Creator address is missing');
                    }
                    // initialize candy
                    loglevel_1["default"].info("initializing candy machine");
                    return [4 /*yield*/, (0, accounts_1.createCandyMachineV2)(anchorProgram, walletKeyPair, treasuryWallet, splToken, {
                            itemsAvailable: new anchor_1.BN(totalNFTs),
                            uuid: uuid,
                            symbol: firstAssetManifest.symbol,
                            sellerFeeBasisPoints: firstAssetManifest.seller_fee_basis_points,
                            isMutable: mutable,
                            maxSupply: new anchor_1.BN(0),
                            retainAuthority: retainAuthority,
                            gatekeeper: gatekeeper,
                            goLiveDate: goLiveDate,
                            price: price,
                            endSettings: endSettings,
                            whitelistMintSettings: whitelistMintSettings,
                            hiddenSettings: hiddenSettings,
                            creators: firstAssetManifest.properties.creators.map(function (creator) {
                                return {
                                    address: new web3_js_1.PublicKey(creator.address),
                                    verified: true,
                                    share: creator.share
                                };
                            })
                        })];
                case 2:
                    res = _k.sent();
                    cacheContent.program.uuid = res.uuid;
                    cacheContent.program.candyMachine = res.candyMachine.toBase58();
                    candyMachine = res.candyMachine;
                    loglevel_1["default"].info("initialized config for a candy machine with publickey: ".concat(res.candyMachine.toBase58()));
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    return [3 /*break*/, 4];
                case 3:
                    exx_1 = _k.sent();
                    loglevel_1["default"].error('Error deploying config to Solana network.', exx_1);
                    throw exx_1;
                case 4: return [3 /*break*/, 6];
                case 5:
                    loglevel_1["default"].info("config for a candy machine with publickey: ".concat(cacheContent.program.candyMachine, " has been already initialized"));
                    _k.label = 6;
                case 6:
                    console.log('Uploading Size', SIZE, dedupedAssetKeys[0]);
                    if (!dedupedAssetKeys.length) return [3 /*break*/, 16];
                    if (!(storage === storage_type_1.StorageType.ArweaveBundle ||
                        storage === storage_type_1.StorageType.ArweaveSol)) return [3 /*break*/, 13];
                    _d = arweave_bundle_1.makeArweaveBundleUploadGenerator;
                    _e = [storage,
                        dirname,
                        dedupedAssetKeys];
                    if (!(storage === storage_type_1.StorageType.ArweaveBundle)) return [3 /*break*/, 8];
                    _h = (_g = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(arweaveJwk)];
                case 7:
                    _f = _h.apply(_g, [(_k.sent()).toString()]);
                    return [3 /*break*/, 9];
                case 8:
                    _f = undefined;
                    _k.label = 9;
                case 9:
                    arweaveBundleUploadGenerator = _d.apply(void 0, _e.concat([_f, storage === storage_type_1.StorageType.ArweaveSol ? walletKeyPair : undefined]));
                    result = arweaveBundleUploadGenerator.next();
                    _k.label = 10;
                case 10:
                    if (!!result.done) return [3 /*break*/, 12];
                    return [4 /*yield*/, result.value];
                case 11:
                    _j = _k.sent(), cacheKeys = _j.cacheKeys, arweavePathManifestLinks = _j.arweavePathManifestLinks, updatedManifests = _j.updatedManifests;
                    updateCacheAfterUpload(cacheContent, cacheKeys, arweavePathManifestLinks, updatedManifests);
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    loglevel_1["default"].info('Saved bundle upload result to cache.');
                    result = arweaveBundleUploadGenerator.next();
                    return [3 /*break*/, 10];
                case 12:
                    loglevel_1["default"].info('Upload done.');
                    return [3 /*break*/, 15];
                case 13:
                    lastPrinted_1 = 0;
                    tick_1 = SIZE / 100;
                    return [4 /*yield*/, Promise.all((0, various_1.chunks)(Array.from(Array(SIZE).keys()), batchSize || 50).map(function (allIndexesInSlice) { return __awaiter(_this, void 0, void 0, function () {
                            var i, assetKey, image, manifest, manifestBuffer, link, imageLink, _a, err_1;
                            var _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        i = 0;
                                        _e.label = 1;
                                    case 1:
                                        if (!(i < allIndexesInSlice.length)) return [3 /*break*/, 12];
                                        assetKey = dedupedAssetKeys[allIndexesInSlice[i]];
                                        image = path_1["default"].join(dirname, "".concat(assetKey.index).concat(assetKey.mediaExt));
                                        manifest = getAssetManifest(dirname, assetKey.index.includes('json')
                                            ? assetKey.index
                                            : "".concat(assetKey.index, ".json"));
                                        manifestBuffer = Buffer.from(JSON.stringify(manifest));
                                        if (allIndexesInSlice[i] >= lastPrinted_1 + tick_1 ||
                                            allIndexesInSlice[i] === 0) {
                                            lastPrinted_1 = allIndexesInSlice[i];
                                            loglevel_1["default"].info("Processing asset: ".concat(allIndexesInSlice[i]));
                                        }
                                        link = void 0, imageLink = void 0;
                                        _e.label = 2;
                                    case 2:
                                        _e.trys.push([2, 10, , 11]);
                                        _a = storage;
                                        switch (_a) {
                                            case storage_type_1.StorageType.Ipfs: return [3 /*break*/, 3];
                                            case storage_type_1.StorageType.Aws: return [3 /*break*/, 5];
                                            case storage_type_1.StorageType.Arweave: return [3 /*break*/, 7];
                                        }
                                        return [3 /*break*/, 7];
                                    case 3: return [4 /*yield*/, (0, ipfs_1.ipfsUpload)(ipfsCredentials, image, manifestBuffer)];
                                    case 4:
                                        _b = _e.sent(), link = _b[0], imageLink = _b[1];
                                        return [3 /*break*/, 9];
                                    case 5: return [4 /*yield*/, (0, aws_1.awsUpload)(awsS3Bucket, image, manifestBuffer)];
                                    case 6:
                                        _c = _e.sent(), link = _c[0], imageLink = _c[1];
                                        return [3 /*break*/, 9];
                                    case 7: return [4 /*yield*/, (0, arweave_1.arweaveUpload)(walletKeyPair, anchorProgram, env, image, manifestBuffer, manifest, assetKey.index)];
                                    case 8:
                                        _d = _e.sent(), link = _d[0], imageLink = _d[1];
                                        _e.label = 9;
                                    case 9:
                                        if (link && imageLink) {
                                            loglevel_1["default"].debug('Updating cache for ', allIndexesInSlice[i]);
                                            cacheContent.items[assetKey.index] = {
                                                link: link,
                                                name: manifest.name,
                                                onChain: false
                                            };
                                            (0, cache_1.saveCache)(cacheName, env, cacheContent);
                                        }
                                        return [3 /*break*/, 11];
                                    case 10:
                                        err_1 = _e.sent();
                                        loglevel_1["default"].error("Error uploading file ".concat(assetKey), err_1);
                                        i--;
                                        return [3 /*break*/, 11];
                                    case 11:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 12: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 14:
                    _k.sent();
                    _k.label = 15;
                case 15:
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    _k.label = 16;
                case 16:
                    keys = Object.keys(cacheContent.items);
                    if (!!hiddenSettings) return [3 /*break*/, 22];
                    _k.label = 17;
                case 17:
                    _k.trys.push([17, 19, 20, 21]);
                    return [4 /*yield*/, Promise.all((0, various_1.chunks)(Array.from(Array(keys.length).keys()), 1000).map(function (allIndexesInSlice) { return __awaiter(_this, void 0, void 0, function () {
                            var offset, indexes, onChain, ind, e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        offset = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(offset < allIndexesInSlice.length)) return [3 /*break*/, 6];
                                        indexes = allIndexesInSlice.slice(offset, offset + 10);
                                        onChain = indexes.filter(function (i) {
                                            var _a;
                                            var index = keys[i];
                                            return ((_a = cacheContent.items[index]) === null || _a === void 0 ? void 0 : _a.onChain) || false;
                                        });
                                        ind = keys[indexes[0]];
                                        if (!(onChain.length != indexes.length)) return [3 /*break*/, 5];
                                        loglevel_1["default"].info("Writing indices ".concat(ind, "-").concat(keys[indexes[indexes.length - 1]]));
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, anchorProgram.rpc.addConfigLines(ind, indexes.map(function (i) { return ({
                                                uri: cacheContent.items[keys[i]].link,
                                                name: cacheContent.items[keys[i]].name
                                            }); }), {
                                                accounts: {
                                                    candyMachine: candyMachine,
                                                    authority: walletKeyPair.publicKey
                                                },
                                                signers: [walletKeyPair]
                                            })];
                                    case 3:
                                        _a.sent();
                                        indexes.forEach(function (i) {
                                            cacheContent.items[keys[i]] = __assign(__assign({}, cacheContent.items[keys[i]]), { onChain: true, verifyRun: false });
                                        });
                                        (0, cache_1.saveCache)(cacheName, env, cacheContent);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_2 = _a.sent();
                                        loglevel_1["default"].error("saving config line ".concat(ind, "-").concat(keys[indexes[indexes.length - 1]], " failed"), e_2);
                                        uploadSuccessful = false;
                                        return [3 /*break*/, 5];
                                    case 5:
                                        offset += 10;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 18:
                    _k.sent();
                    return [3 /*break*/, 21];
                case 19:
                    e_1 = _k.sent();
                    loglevel_1["default"].error(e_1);
                    return [3 /*break*/, 21];
                case 20:
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    return [7 /*endfinally*/];
                case 21: return [3 /*break*/, 23];
                case 22:
                    loglevel_1["default"].info('Skipping upload to chain as this is a hidden Candy Machine');
                    _k.label = 23;
                case 23:
                    console.log("Done. Successful = ".concat(uploadSuccessful, "."));
                    return [2 /*return*/, uploadSuccessful];
            }
        });
    });
}
exports.uploadV2 = uploadV2;
/**
 * From the Cache object & a list of file paths, return a list of asset keys
 * (filenames without extension nor path) that should be uploaded, sorted numerically in ascending order.
 * Assets which should be uploaded either are not present in the Cache object,
 * or do not truthy value for the `link` property.
 */
function getAssetKeysNeedingUpload(items, files) {
    var all = __spreadArray([], new Set(__spreadArray(__spreadArray([], Object.keys(items), true), files.map(function (filePath) { return path_1["default"].basename(filePath); }), true)), true);
    var keyMap = {};
    return all
        .filter(function (k) { return !k.includes('.json'); })
        .reduce(function (acc, assetKey) {
        var _a;
        var ext = path_1["default"].extname(assetKey);
        var key = path_1["default"].basename(assetKey, ext);
        if (!((_a = items[key]) === null || _a === void 0 ? void 0 : _a.link) && !keyMap[key]) {
            keyMap[key] = true;
            acc.push({ mediaExt: ext, index: key });
        }
        return acc;
    }, [])
        .sort(function (a, b) { return Number.parseInt(a.key, 10) - Number.parseInt(b.key, 10); });
}
/**
 * Returns a Manifest from a path and an assetKey
 * Replaces image.ext => index.ext
 */
function getAssetManifest(dirname, assetKey) {
    var _a, _b, _c, _d;
    var assetIndex = assetKey.includes('.json')
        ? assetKey.substring(0, assetKey.length - 5)
        : assetKey;
    var manifestPath = path_1["default"].join(dirname, "".concat(assetIndex, ".json"));
    var manifest = JSON.parse(fs_1["default"].readFileSync(manifestPath).toString());
    manifest.image = manifest.image.replace('image', assetIndex);
    if (((_b = (_a = manifest.properties) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        manifest.properties.files[0].uri =
            (_d = (_c = manifest.properties.files[0]) === null || _c === void 0 ? void 0 : _c.uri) === null || _d === void 0 ? void 0 : _d.replace('image', assetIndex);
    }
    return manifest;
}
/**
 * For each asset present in the Cache object, write to the deployed
 * configuration an additional line with the name of the asset and the link
 * to its manifest, if the asset was not already written according to the
 * value of `onChain` property in the Cache object, for said asset.
 */
function writeIndices(_a) {
    var anchorProgram = _a.anchorProgram, cache = _a.cache, cacheName = _a.cacheName, env = _a.env, config = _a.config, walletKeyPair = _a.walletKeyPair;
    return __awaiter(this, void 0, void 0, function () {
        var keys, e_3;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    keys = Object.keys(cache.items);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.all((0, various_1.chunks)(Array.from(Array(keys.length).keys()), 1000).map(function (allIndexesInSlice) { return __awaiter(_this, void 0, void 0, function () {
                            var offset, indexes, onChain, ind, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        offset = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(offset < allIndexesInSlice.length)) return [3 /*break*/, 6];
                                        indexes = allIndexesInSlice.slice(offset, offset + 10);
                                        onChain = indexes.filter(function (i) {
                                            var _a;
                                            var index = keys[i];
                                            return ((_a = cache.items[index]) === null || _a === void 0 ? void 0 : _a.onChain) || false;
                                        });
                                        ind = keys[indexes[0]];
                                        if (!(onChain.length != indexes.length)) return [3 /*break*/, 5];
                                        loglevel_1["default"].info("Writing indices ".concat(ind, "-").concat(keys[indexes[indexes.length - 1]]));
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, anchorProgram.rpc.addConfigLines(ind, indexes.map(function (i) { return ({
                                                uri: cache.items[keys[i]].link,
                                                name: cache.items[keys[i]].name
                                            }); }), {
                                                accounts: {
                                                    config: config,
                                                    authority: walletKeyPair.publicKey
                                                },
                                                signers: [walletKeyPair]
                                            })];
                                    case 3:
                                        _a.sent();
                                        indexes.forEach(function (i) {
                                            cache.items[keys[i]] = __assign(__assign({}, cache.items[keys[i]]), { onChain: true });
                                        });
                                        (0, cache_1.saveCache)(cacheName, env, cache);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        err_2 = _a.sent();
                                        loglevel_1["default"].error("Saving config line ".concat(ind, "-").concat(keys[indexes[indexes.length - 1]], " failed"), err_2);
                                        return [3 /*break*/, 5];
                                    case 5:
                                        offset += 10;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_3 = _b.sent();
                    loglevel_1["default"].error(e_3);
                    return [3 /*break*/, 5];
                case 4:
                    (0, cache_1.saveCache)(cacheName, env, cache);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Save the Candy Machine's authority (public key) to the Cache object / file.
 */
function setAuthority(publicKey, cache, cacheName, env) {
    cache.authority = publicKey.toBase58();
    (0, cache_1.saveCache)(cacheName, env, cache);
}
/**
 * Update the Cache object for assets that were uploaded with their matching
 * Manifest link. Also set the `onChain` property to `false` so we know this
 * asset should later be appended to the deployed Candy Machine program's
 * configuration on chain.
 */
function updateCacheAfterUpload(cache, cacheKeys, links, manifests) {
    cacheKeys.forEach(function (cacheKey, idx) {
        cache.items[cacheKey] = {
            link: links[idx],
            name: manifests[idx].name,
            onChain: false
        };
    });
}
function upload(_a) {
    var _b;
    var files = _a.files, cacheName = _a.cacheName, env = _a.env, keypair = _a.keypair, storage = _a.storage, rpcUrl = _a.rpcUrl, ipfsCredentials = _a.ipfsCredentials, awsS3Bucket = _a.awsS3Bucket, arweaveJwk = _a.arweaveJwk, batchSize = _a.batchSize;
    return __awaiter(this, void 0, void 0, function () {
        var cache, config, dirname, dedupedAssetKeys, walletKeyPair, anchorProgram, arweaveBundleUploadGenerator, _c, _d, _e, _f, _g, result, _h, cacheKeys, arweavePathManifestLinks, updatedManifests, SIZE, tick_2, lastPrinted_2;
        var _this = this;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    cache = (0, cache_1.loadCache)(cacheName, env);
                    if (cache === undefined) {
                        loglevel_1["default"].error('Existing cache not found. To create a new candy machine, please use candy machine v2.');
                        throw new Error('Existing cache not found');
                    }
                    // Make sure config exists in cache
                    if (!((_b = cache.program) === null || _b === void 0 ? void 0 : _b.config)) {
                        loglevel_1["default"].error('existing config account not found in cache. To create a new candy machine, please use candy machine v2.');
                        throw new Error('config account not found in cache');
                    }
                    config = new web3_js_1.PublicKey(cache.program.config);
                    cache.items = cache.items || {};
                    dirname = path_1["default"].dirname(files[0]);
                    dedupedAssetKeys = getAssetKeysNeedingUpload(cache.items, files);
                    walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                    return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env, rpcUrl)];
                case 1:
                    anchorProgram = _j.sent();
                    if (!dedupedAssetKeys.length) return [3 /*break*/, 11];
                    if (!(storage === storage_type_1.StorageType.ArweaveBundle ||
                        storage === storage_type_1.StorageType.ArweaveSol)) return [3 /*break*/, 8];
                    _c = arweave_bundle_1.makeArweaveBundleUploadGenerator;
                    _d = [storage,
                        dirname,
                        dedupedAssetKeys];
                    if (!(storage === storage_type_1.StorageType.ArweaveBundle)) return [3 /*break*/, 3];
                    _g = (_f = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(arweaveJwk)];
                case 2:
                    _e = _g.apply(_f, [(_j.sent()).toString()]);
                    return [3 /*break*/, 4];
                case 3:
                    _e = undefined;
                    _j.label = 4;
                case 4:
                    arweaveBundleUploadGenerator = _c.apply(void 0, _d.concat([_e, storage === storage_type_1.StorageType.ArweaveSol ? walletKeyPair : undefined]));
                    result = arweaveBundleUploadGenerator.next();
                    _j.label = 5;
                case 5:
                    if (!!result.done) return [3 /*break*/, 7];
                    return [4 /*yield*/, result.value];
                case 6:
                    _h = _j.sent(), cacheKeys = _h.cacheKeys, arweavePathManifestLinks = _h.arweavePathManifestLinks, updatedManifests = _h.updatedManifests;
                    updateCacheAfterUpload(cache, cacheKeys, arweavePathManifestLinks, updatedManifests);
                    (0, cache_1.saveCache)(cacheName, env, cache);
                    loglevel_1["default"].info('Saved bundle upload result to cache.');
                    result = arweaveBundleUploadGenerator.next();
                    return [3 /*break*/, 5];
                case 7:
                    loglevel_1["default"].info('Upload done.');
                    return [3 /*break*/, 10];
                case 8:
                    SIZE = dedupedAssetKeys.length;
                    tick_2 = SIZE / 100;
                    lastPrinted_2 = 0;
                    return [4 /*yield*/, Promise.all((0, various_1.chunks)(Array.from(Array(SIZE).keys()), batchSize || 50).map(function (allIndexesInSlice) { return __awaiter(_this, void 0, void 0, function () {
                            var i, assetKey, image, manifest, manifestBuffer, link, imageLink, _a, err_3;
                            var _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        i = 0;
                                        _e.label = 1;
                                    case 1:
                                        if (!(i < allIndexesInSlice.length)) return [3 /*break*/, 12];
                                        assetKey = dedupedAssetKeys[i];
                                        image = path_1["default"].join(dirname, "".concat(assetKey.index).concat(assetKey.mediaExt));
                                        manifest = getAssetManifest(dirname, assetKey.index.includes('json')
                                            ? assetKey.index
                                            : "".concat(assetKey.index, ".json"));
                                        manifestBuffer = Buffer.from(JSON.stringify(manifest));
                                        if (i >= lastPrinted_2 + tick_2 || i === 0) {
                                            lastPrinted_2 = i;
                                            loglevel_1["default"].info("Processing asset: ".concat(assetKey));
                                        }
                                        link = void 0, imageLink = void 0;
                                        _e.label = 2;
                                    case 2:
                                        _e.trys.push([2, 10, , 11]);
                                        _a = storage;
                                        switch (_a) {
                                            case storage_type_1.StorageType.Ipfs: return [3 /*break*/, 3];
                                            case storage_type_1.StorageType.Aws: return [3 /*break*/, 5];
                                            case storage_type_1.StorageType.Arweave: return [3 /*break*/, 7];
                                        }
                                        return [3 /*break*/, 7];
                                    case 3: return [4 /*yield*/, (0, ipfs_1.ipfsUpload)(ipfsCredentials, image, manifestBuffer)];
                                    case 4:
                                        _b = _e.sent(), link = _b[0], imageLink = _b[1];
                                        return [3 /*break*/, 9];
                                    case 5: return [4 /*yield*/, (0, aws_1.awsUpload)(awsS3Bucket, image, manifestBuffer)];
                                    case 6:
                                        _c = _e.sent(), link = _c[0], imageLink = _c[1];
                                        return [3 /*break*/, 9];
                                    case 7: return [4 /*yield*/, (0, arweave_1.arweaveUpload)(walletKeyPair, anchorProgram, env, image, manifestBuffer, manifest, i)];
                                    case 8:
                                        _d = _e.sent(), link = _d[0], imageLink = _d[1];
                                        _e.label = 9;
                                    case 9:
                                        if (link && imageLink) {
                                            loglevel_1["default"].debug('Updating cache for ', assetKey);
                                            cache.items[assetKey.index] = {
                                                link: link,
                                                imageLink: imageLink,
                                                name: manifest.name,
                                                onChain: false
                                            };
                                            (0, cache_1.saveCache)(cacheName, env, cache);
                                        }
                                        return [3 /*break*/, 11];
                                    case 10:
                                        err_3 = _e.sent();
                                        loglevel_1["default"].error("Error uploading file ".concat(assetKey), err_3);
                                        throw err_3;
                                    case 11:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 12: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 9:
                    _j.sent();
                    _j.label = 10;
                case 10:
                    setAuthority(walletKeyPair.publicKey, cache, cacheName, env);
                    return [2 /*return*/, writeIndices({
                            anchorProgram: anchorProgram,
                            cache: cache,
                            cacheName: cacheName,
                            env: env,
                            config: config,
                            walletKeyPair: walletKeyPair
                        })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.upload = upload;
