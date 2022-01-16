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
exports.makeArweaveBundleUploadGenerator = exports.LAMPORTS = void 0;
var promises_1 = require("fs/promises");
var path_1 = require("path");
var arweave_1 = require("arweave");
var arbundles_1 = require("arbundles");
var loglevel_1 = require("loglevel");
var storage_type_1 = require("../storage-type");
var mime_1 = require("mime");
var various_1 = require("../various");
var client_1 = require("@bundlr-network/client");
exports.LAMPORTS = 1000000000;
// The limit for the cumulated size of filepairs to include in a single bundle.
// arBundles has a limit of 250MB, we use our own limit way below that to:
// - account for the bundling overhead (tags, headers, ...)
// - lower the risk of having to re-upload voluminous filepairs
// - lower the risk for OOM crashes of the Node.js process
// - provide feedback to the user as the collection is bundles & uploaded progressively
// Change at your own risk.
var BUNDLE_SIZE_BYTE_LIMIT = 50 * 1024 * 1024;
/**
 * Tags to include with every individual transaction.
 */
var BASE_TAGS = [{ name: 'App-Name', value: 'Metaplex Candy Machine' }];
var contentTypeTags = {
    json: { name: 'Content-Type', value: 'application/json' },
    'arweave-manifest': {
        name: 'Content-Type',
        value: 'application/x.arweave-manifest+json'
    }
};
/**
 * Create an Arweave instance with sane defaults.
 */
function getArweave() {
    return new arweave_1["default"]({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 20000,
        logging: false,
        logger: console.log
    });
}
/**
 * Simplistic helper to convert a bytes value to its MB counterpart.
 */
function sizeMB(bytes) {
    var precision = 3;
    var rounder = Math.pow(10, 3);
    return (Math.round((bytes / (1024 * 1024)) * rounder) / rounder).toFixed(precision);
}
/**
 * Create the Arweave Path Manifest from the asset image / manifest
 * pair txIds, helps Arweave Gateways find the files.
 * Instructs arweave gateways to serve metadata.json by default
 * when accessing the transaction.
 * See:
 * - https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md
 * - https://github.com/metaplex-foundation/metaplex/pull/859#pullrequestreview-805914075
 */
function createArweavePathManifest(imageTxId, manifestTxId, mediaType) {
    var _a;
    var arweavePathManifest = {
        manifest: 'arweave/paths',
        version: '0.1.0',
        paths: (_a = {},
            _a["image".concat(mediaType)] = {
                id: imageTxId
            },
            _a['metadata.json'] = {
                id: manifestTxId
            },
            _a),
        index: {
            path: 'metadata.json'
        }
    };
    return arweavePathManifest;
}
// The size in bytes of a dummy Arweave Path Manifest.
// Used to account for the size of a file pair manifest, in the computation
// of a bundle range.
var dummyAreaveManifestByteSize = (function () {
    var dummyAreaveManifest = createArweavePathManifest('akBSbAEWTf6xDDnrG_BHKaxXjxoGuBnuhMnoYKUCDZo', 'akBSbAEWTf6xDDnrG_BHKaxXjxoGuBnuhMnoYKUCDZo', '.png');
    return Buffer.byteLength(JSON.stringify(dummyAreaveManifest));
})();
/**
 * From a list of file pairs, compute the BundleRange that should be included
 * in a bundle, consisting of one or multiple image + manifest pairs,
 * according to the size of the files to be included in respect of the
 * BUNDLE_SIZE_LIMIT.
 */
function getBundleRange(filePairs, splitSize) {
    if (splitSize === void 0) { splitSize = false; }
    return __awaiter(this, void 0, void 0, function () {
        var total, count, _i, filePairs_1, _a, key, image, manifest, filePairSize, limit;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    total = 0;
                    count = 0;
                    _i = 0, filePairs_1 = filePairs;
                    _b.label = 1;
                case 1:
                    if (!(_i < filePairs_1.length)) return [3 /*break*/, 4];
                    _a = filePairs_1[_i], key = _a.key, image = _a.image, manifest = _a.manifest;
                    return [4 /*yield*/, [image, manifest].reduce(function (accP, file) { return __awaiter(_this, void 0, void 0, function () {
                            var acc, size;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, accP];
                                    case 1:
                                        acc = _a.sent();
                                        return [4 /*yield*/, (0, promises_1.stat)(file)];
                                    case 2:
                                        size = (_a.sent()).size;
                                        return [2 /*return*/, acc + size];
                                }
                            });
                        }); }, Promise.resolve(dummyAreaveManifestByteSize))];
                case 2:
                    filePairSize = _b.sent();
                    limit = splitSize
                        ? BUNDLE_SIZE_BYTE_LIMIT * 2
                        : BUNDLE_SIZE_BYTE_LIMIT;
                    if (total + filePairSize >= limit) {
                        if (count === 0) {
                            throw new Error("Image + Manifest filepair (".concat(key, ") too big (").concat(sizeMB(filePairSize), "MB) for arBundles size limit of ").concat(sizeMB(BUNDLE_SIZE_BYTE_LIMIT), "MB."));
                        }
                        return [3 /*break*/, 4];
                    }
                    total += filePairSize;
                    count += 1;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, { count: count, size: total }];
            }
        });
    });
}
var imageTags = __spreadArray([], BASE_TAGS, true);
/**
 * Retrieve a DataItem which will hold the asset's image binary data
 * & represent an individual Arweave transaction which can be signed & bundled.
 */
function getImageDataItem(signer, image, contentType) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, arbundles_1.createData)(image, signer, {
                    tags: imageTags.concat({ name: 'Content-Type', value: contentType })
                })];
        });
    });
}
var manifestTags = __spreadArray(__spreadArray([], BASE_TAGS, true), [contentTypeTags['json']], false);
/**
 * Retrieve a DataItem which will hold the asset's manifest binary data
 * & represent an individual Arweave transaction which can be signed & bundled.
 */
function getManifestDataItem(signer, manifest) {
    return (0, arbundles_1.createData)(JSON.stringify(manifest), signer, { tags: manifestTags });
}
var arweavePathManifestTags = __spreadArray(__spreadArray([], BASE_TAGS, true), [
    contentTypeTags['arweave-manifest'],
], false);
/**
 * Retrieve a DataItem which will hold the Arweave Path Manifest binary data
 * & represent an individual Arweave transaction which can be signed & bundled.
 */
function getArweavePathManifestDataItem(signer, arweavePathManifest) {
    return (0, arbundles_1.createData)(JSON.stringify(arweavePathManifest), signer, {
        tags: arweavePathManifestTags
    });
}
/**
 * Retrieve an asset's manifest from the filesystem & update it with the link
 * to the asset's image link, obtained from signing the asset image DataItem.
 */
function getUpdatedManifest(manifestPath, imageLink, contentType) {
    return __awaiter(this, void 0, void 0, function () {
        var manifest, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(manifestPath)];
                case 1:
                    manifest = _b.apply(_a, [(_c.sent()).toString()]);
                    manifest.image = imageLink;
                    manifest.properties.files = [{ type: contentType, uri: imageLink }];
                    return [2 /*return*/, manifest];
            }
        });
    });
}
/**
 * Fetches the corresponding filepair and creates a data item if arweave bundle
 * or creates a bundlr transaction if arweave sol, to basically avoid clashing
 * between data item's id
 */
function processFiles(_a) {
    var signer = _a.signer, filePair = _a.filePair, bundlr = _a.bundlr, storageType = _a.storageType;
    return __awaiter(this, void 0, void 0, function () {
        var contentType, imageBuffer, imageDataItem, manifestDataItem, arweavePathManifestDataItem, imageLink, manifest, arweavePathManifest;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contentType = (0, mime_1.getType)(filePair.image);
                    return [4 /*yield*/, (0, promises_1.readFile)(filePair.image)];
                case 1:
                    imageBuffer = _b.sent();
                    if (!(storageType === storage_type_1.StorageType.ArweaveSol)) return [3 /*break*/, 3];
                    imageDataItem = bundlr.createTransaction(imageBuffer, {
                        tags: imageTags.concat({
                            name: 'Content-Type',
                            value: contentType
                        })
                    });
                    return [4 /*yield*/, imageDataItem.sign()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 3:
                    if (!(storageType === storage_type_1.StorageType.ArweaveBundle)) return [3 /*break*/, 6];
                    return [4 /*yield*/, getImageDataItem(signer, imageBuffer, contentType)];
                case 4:
                    imageDataItem = _b.sent();
                    return [4 /*yield*/, imageDataItem.sign(signer)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    imageLink = "https://arweave.net/".concat(imageDataItem.id);
                    return [4 /*yield*/, getUpdatedManifest(filePair.manifest, imageLink, contentType)];
                case 7:
                    manifest = _b.sent();
                    if (!(storageType === storage_type_1.StorageType.ArweaveSol)) return [3 /*break*/, 9];
                    manifestDataItem = bundlr.createTransaction(JSON.stringify(manifest), {
                        tags: manifestTags
                    });
                    return [4 /*yield*/, manifestDataItem.sign()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 9:
                    if (!(storageType === storage_type_1.StorageType.ArweaveBundle)) return [3 /*break*/, 11];
                    manifestDataItem = getManifestDataItem(signer, manifest);
                    return [4 /*yield*/, manifestDataItem.sign(signer)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11:
                    arweavePathManifest = createArweavePathManifest(imageDataItem.id, manifestDataItem.id, ".".concat((0, mime_1.getExtension)(contentType)));
                    if (!(storageType === storage_type_1.StorageType.ArweaveSol)) return [3 /*break*/, 14];
                    arweavePathManifestDataItem = bundlr.createTransaction(JSON.stringify(arweavePathManifest), { tags: arweavePathManifestTags });
                    return [4 /*yield*/, arweavePathManifestDataItem.sign()];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, arweavePathManifestDataItem.sign(signer)];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 14:
                    if (!(storageType === storage_type_1.StorageType.ArweaveBundle)) return [3 /*break*/, 16];
                    arweavePathManifestDataItem = getArweavePathManifestDataItem(signer, arweavePathManifest);
                    return [4 /*yield*/, arweavePathManifestDataItem.sign(signer)];
                case 15:
                    _b.sent();
                    _b.label = 16;
                case 16: return [2 /*return*/, {
                        imageDataItem: imageDataItem,
                        manifestDataItem: manifestDataItem,
                        arweavePathManifestDataItem: arweavePathManifestDataItem,
                        manifest: manifest
                    }];
            }
        });
    });
}
/**
 * Initialize the Arweave Bundle Upload Generator.
 * Returns a Generator function that allows to trigger an asynchronous bundle
 * upload to Arweave when calling generator.next().
 * The Arweave Bundle Upload Generator automatically groups assets file pairs
 * into appropriately sized bundles.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
 */
function makeArweaveBundleUploadGenerator(storage, dirname, assets, jwk, walletKeyPair) {
    var signer, storageType, arweave, bundlr, filePairs, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storageType = storage;
                if (storageType === storage_type_1.StorageType.ArweaveSol && !walletKeyPair) {
                    throw new Error('To pay for uploads with SOL, you need to pass a Solana Keypair');
                }
                if (storageType === storage_type_1.StorageType.ArweaveBundle && !jwk) {
                    throw new Error('To pay for uploads with AR, you need to pass a Arweave JWK');
                }
                if (storageType === storage_type_1.StorageType.ArweaveBundle) {
                    signer = new arbundles_1.signers.ArweaveSigner(jwk);
                }
                arweave = getArweave();
                bundlr = storageType === storage_type_1.StorageType.ArweaveSol
                    ? new client_1["default"]('https://node1.bundlr.network', 'solana', walletKeyPair.secretKey)
                    : undefined;
                filePairs = assets.map(function (asset) { return ({
                    key: asset.index,
                    image: path_1["default"].join(dirname, "".concat(asset.index).concat(asset.mediaExt)),
                    manifest: path_1["default"].join(dirname, "".concat(asset.index, ".json"))
                }); });
                // Yield an empty result object before processing file pairs
                // & uploading bundles for initialization.
                return [4 /*yield*/, Promise.resolve({
                        cacheKeys: [],
                        arweavePathManifestLinks: [],
                        updatedManifests: []
                    })];
            case 1:
                // Yield an empty result object before processing file pairs
                // & uploading bundles for initialization.
                _a.sent();
                _a.label = 2;
            case 2:
                if (!filePairs.length) return [3 /*break*/, 4];
                result = getBundleRange(filePairs, storage === storage_type_1.StorageType.ArweaveSol ? true : false).then(function processBundle(_a) {
                    var count = _a.count, size = _a.size;
                    return __awaiter(this, void 0, void 0, function () {
                        var bundleFilePairs, _b, cacheKeys, dataItems, arweavePathManifestLinks, updatedManifests, bundlrTransactions, bytes, cost, _loop_1, _i, bundlrTransactions_1, tx, startBundleTime, bundle, endBundleTime, tx;
                        var _this = this;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    loglevel_1["default"].info("Computed Bundle range, including ".concat(count, " file pair(s) totaling ").concat(sizeMB(size), "MB."));
                                    bundleFilePairs = filePairs.splice(0, count);
                                    return [4 /*yield*/, bundleFilePairs.reduce(
                                        // Process a bundle file pair (image + manifest).
                                        // - retrieve image data, put it in a DataItem
                                        // - sign the image DataItem and build the image link from the txId.
                                        // - retrieve & update the asset manifest w/ the image link
                                        // - put the manifest in a DataItem
                                        // - sign the manifest DataItem and build the manifest link form the txId.
                                        // - create the Arweave Path Manifest w/ both asset image + manifest txIds pair.
                                        // - fill the results accumulator
                                        function processBundleFilePair(accP, filePair) {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var acc, _a, imageDataItem, manifestDataItem, arweavePathManifestDataItem, manifest, arweavePathManifestLink;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0: return [4 /*yield*/, accP];
                                                        case 1:
                                                            acc = _b.sent();
                                                            loglevel_1["default"].debug('Processing File Pair', filePair.key);
                                                            return [4 /*yield*/, processFiles({ storageType: storageType, signer: signer, bundlr: bundlr, filePair: filePair })];
                                                        case 2:
                                                            _a = _b.sent(), imageDataItem = _a.imageDataItem, manifestDataItem = _a.manifestDataItem, arweavePathManifestDataItem = _a.arweavePathManifestDataItem, manifest = _a.manifest;
                                                            arweavePathManifestLink = "https://arweave.net/".concat(manifestDataItem.id);
                                                            acc.cacheKeys.push(filePair.key);
                                                            acc.dataItems.push(imageDataItem, manifestDataItem, arweavePathManifestDataItem);
                                                            acc.arweavePathManifestLinks.push(arweavePathManifestLink);
                                                            acc.updatedManifests.push(manifest);
                                                            loglevel_1["default"].debug('Processed File Pair', filePair.key);
                                                            return [2 /*return*/, acc];
                                                    }
                                                });
                                            });
                                        }, Promise.resolve({
                                            cacheKeys: [],
                                            dataItems: [],
                                            arweavePathManifestLinks: [],
                                            updatedManifests: []
                                        }))];
                                case 1:
                                    _b = _c.sent(), cacheKeys = _b.cacheKeys, dataItems = _b.dataItems, arweavePathManifestLinks = _b.arweavePathManifestLinks, updatedManifests = _b.updatedManifests;
                                    if (!(storageType === storage_type_1.StorageType.ArweaveSol)) return [3 /*break*/, 8];
                                    bundlrTransactions = __spreadArray([], dataItems, true);
                                    loglevel_1["default"].info('Uploading bundle via bundlr... in multiple transactions');
                                    bytes = dataItems.reduce(function (c, d) { return c + d.data.length; }, 0);
                                    return [4 /*yield*/, bundlr.utils.getPrice('solana', bytes)];
                                case 2:
                                    cost = _c.sent();
                                    loglevel_1["default"].info("".concat(cost.toNumber() / exports.LAMPORTS, " SOL to upload"));
                                    return [4 /*yield*/, bundlr.fund(cost.toNumber())];
                                case 3:
                                    _c.sent();
                                    _loop_1 = function (tx) {
                                        var attempts, uploadTransaction;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    attempts = 0;
                                                    uploadTransaction = function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var _this = this;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, tx.upload()["catch"](function (err) { return __awaiter(_this, void 0, void 0, function () {
                                                                        return __generator(this, function (_a) {
                                                                            switch (_a.label) {
                                                                                case 0:
                                                                                    attempts++;
                                                                                    if (attempts >= 3) {
                                                                                        throw err;
                                                                                    }
                                                                                    loglevel_1["default"].warn("Failed bundlr upload, automatically retrying transaction in 10s (attempt: ".concat(attempts, ")"), err);
                                                                                    return [4 /*yield*/, (0, various_1.sleep)(10 * 1000)];
                                                                                case 1:
                                                                                    _a.sent();
                                                                                    return [4 /*yield*/, uploadTransaction()];
                                                                                case 2:
                                                                                    _a.sent();
                                                                                    return [2 /*return*/];
                                                                            }
                                                                        });
                                                                    }); })];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); };
                                                    return [4 /*yield*/, uploadTransaction()];
                                                case 1:
                                                    _d.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _i = 0, bundlrTransactions_1 = bundlrTransactions;
                                    _c.label = 4;
                                case 4:
                                    if (!(_i < bundlrTransactions_1.length)) return [3 /*break*/, 7];
                                    tx = bundlrTransactions_1[_i];
                                    return [5 /*yield**/, _loop_1(tx)];
                                case 5:
                                    _c.sent();
                                    _c.label = 6;
                                case 6:
                                    _i++;
                                    return [3 /*break*/, 4];
                                case 7:
                                    loglevel_1["default"].info('Bundle uploaded!');
                                    _c.label = 8;
                                case 8:
                                    if (!(storageType === storage_type_1.StorageType.ArweaveBundle)) return [3 /*break*/, 13];
                                    startBundleTime = Date.now();
                                    loglevel_1["default"].info('Bundling...');
                                    return [4 /*yield*/, (0, arbundles_1.bundleAndSignData)(dataItems, signer)];
                                case 9:
                                    bundle = _c.sent();
                                    endBundleTime = Date.now();
                                    loglevel_1["default"].info("Bundled ".concat(dataItems.length, " data items in ").concat((endBundleTime - startBundleTime) / 1000, "s"));
                                    return [4 /*yield*/, bundle.toTransaction(arweave, jwk)];
                                case 10:
                                    tx = _c.sent();
                                    return [4 /*yield*/, arweave.transactions.sign(tx, jwk)];
                                case 11:
                                    _c.sent();
                                    loglevel_1["default"].info('Uploading bundle via arbundle...');
                                    return [4 /*yield*/, arweave.transactions.post(tx)];
                                case 12:
                                    _c.sent();
                                    loglevel_1["default"].info('Bundle uploaded!', tx.id);
                                    _c.label = 13;
                                case 13: return [2 /*return*/, { cacheKeys: cacheKeys, arweavePathManifestLinks: arweavePathManifestLinks, updatedManifests: updatedManifests }];
                            }
                        });
                    });
                });
                return [4 /*yield*/, result];
            case 3:
                _a.sent();
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/];
        }
    });
}
exports.makeArweaveBundleUploadGenerator = makeArweaveBundleUploadGenerator;
