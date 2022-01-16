#!/usr/bin/env ts-node
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
var fs = require("fs");
var path = require("path");
var commander_1 = require("commander");
var anchor = require("@project-serum/anchor");
var various_1 = require("./helpers/various");
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("./helpers/constants");
var accounts_1 = require("./helpers/accounts");
var upload_1 = require("./commands/upload");
var verifyTokenMetadata_1 = require("./commands/verifyTokenMetadata");
var generateConfigurations_1 = require("./commands/generateConfigurations");
var cache_1 = require("./helpers/cache");
var mint_1 = require("./commands/mint");
var sign_1 = require("./commands/sign");
var signAll_1 = require("./commands/signAll");
var loglevel_1 = require("loglevel");
var metadata_1 = require("./helpers/metadata");
var createArt_1 = require("./commands/createArt");
var withdraw_1 = require("./commands/withdraw");
var updateFromCache_1 = require("./commands/updateFromCache");
var storage_type_1 = require("./helpers/storage-type");
var mime_1 = require("mime");
commander_1.program.version('0.0.2');
var supportedImageTypes = {
    'image/png': 1,
    'image/gif': 1,
    'image/jpeg': 1
};
if (!fs.existsSync(constants_1.CACHE_PATH)) {
    fs.mkdirSync(constants_1.CACHE_PATH);
}
loglevel_1["default"].setLevel(loglevel_1["default"].levels.INFO);
programCommand('upload')
    .argument('<directory>', 'Directory containing images named from 0-n', function (val) {
    return fs.readdirSync("".concat(val)).map(function (file) { return path.join(val, file); });
})
    .requiredOption('-cp, --config-path <string>', 'JSON file with candy machine settings')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (files, options, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, configPath, rpcUrl, walletKeyPair, anchorProgram, _b, storage, ipfsInfuraProjectId, number, ipfsInfuraSecret, arweaveJwk, awsS3Bucket, retainAuthority, mutable, batchSize, price, splToken, treasuryWallet, gatekeeper, endSettings, hiddenSettings, whitelistMintSettings, goLiveDate, uuid, ipfsCredentials, imageFileCount, jsonFileCount, supportedFiles, elemCount, startMs, err_1, endMs, timeTaken;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, configPath = _a.configPath, rpcUrl = _a.rpcUrl;
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _c.sent();
                return [4 /*yield*/, (0, various_1.getCandyMachineV2Config)(walletKeyPair, anchorProgram, configPath)];
            case 2:
                _b = _c.sent(), storage = _b.storage, ipfsInfuraProjectId = _b.ipfsInfuraProjectId, number = _b.number, ipfsInfuraSecret = _b.ipfsInfuraSecret, arweaveJwk = _b.arweaveJwk, awsS3Bucket = _b.awsS3Bucket, retainAuthority = _b.retainAuthority, mutable = _b.mutable, batchSize = _b.batchSize, price = _b.price, splToken = _b.splToken, treasuryWallet = _b.treasuryWallet, gatekeeper = _b.gatekeeper, endSettings = _b.endSettings, hiddenSettings = _b.hiddenSettings, whitelistMintSettings = _b.whitelistMintSettings, goLiveDate = _b.goLiveDate, uuid = _b.uuid;
                if (storage === storage_type_1.StorageType.ArweaveSol && env !== 'mainnet-beta') {
                    throw new Error('The arweave-sol storage option only works on mainnet. For devnet, please use either arweave, aws or ipfs\n');
                }
                if (storage === storage_type_1.StorageType.ArweaveBundle && env !== 'mainnet-beta') {
                    throw new Error('The arweave-bundle storage option only works on mainnet because it requires spending real AR tokens. For devnet, please set the --storage option to "aws" or "ipfs"\n');
                }
                if (storage === storage_type_1.StorageType.Arweave) {
                    loglevel_1["default"].warn('WARNING: The "arweave" storage option will be going away soon. Please migrate to arweave-bundle or arweave-sol for mainnet.\n');
                }
                if (storage === storage_type_1.StorageType.ArweaveBundle && !arweaveJwk) {
                    throw new Error('Path to Arweave JWK wallet file (--arweave-jwk) must be provided when using arweave-bundle');
                }
                if (storage === storage_type_1.StorageType.Ipfs &&
                    (!ipfsInfuraProjectId || !ipfsInfuraSecret)) {
                    throw new Error('IPFS selected as storage option but Infura project id or secret key were not provided.');
                }
                if (storage === storage_type_1.StorageType.Aws && !awsS3Bucket) {
                    throw new Error('aws selected as storage option but existing bucket name (--aws-s3-bucket) not provided.');
                }
                if (!Object.values(storage_type_1.StorageType).includes(storage)) {
                    throw new Error("Storage option must either be ".concat(Object.values(storage_type_1.StorageType).join(', '), ". Got: ").concat(storage));
                }
                ipfsCredentials = {
                    projectId: ipfsInfuraProjectId,
                    secretKey: ipfsInfuraSecret
                };
                imageFileCount = 0;
                jsonFileCount = 0;
                supportedFiles = files.filter(function (it) {
                    if (supportedImageTypes[(0, mime_1.getType)(it)]) {
                        imageFileCount++;
                    }
                    else if (it.endsWith(constants_1.EXTENSION_JSON)) {
                        jsonFileCount++;
                    }
                    else {
                        loglevel_1["default"].warn("WARNING: Skipping unsupported file type ".concat(it));
                        return false;
                    }
                    return true;
                });
                if (imageFileCount !== jsonFileCount) {
                    throw new Error("number of img files (".concat(imageFileCount, ") is different than the number of json files (").concat(jsonFileCount, ")"));
                }
                elemCount = number ? number : imageFileCount;
                if (elemCount < imageFileCount) {
                    throw new Error("max number (".concat(elemCount, ") cannot be smaller than the number of elements in the source folder (").concat(imageFileCount, ")"));
                }
                loglevel_1["default"].info("Beginning the upload for ".concat(elemCount, " (img+json) pairs"));
                startMs = Date.now();
                loglevel_1["default"].info('started at: ' + startMs.toString());
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, (0, upload_1.uploadV2)({
                        files: supportedFiles,
                        cacheName: cacheName,
                        env: env,
                        totalNFTs: elemCount,
                        gatekeeper: gatekeeper,
                        storage: storage,
                        retainAuthority: retainAuthority,
                        mutable: mutable,
                        ipfsCredentials: ipfsCredentials,
                        awsS3Bucket: awsS3Bucket,
                        batchSize: batchSize,
                        price: price,
                        treasuryWallet: treasuryWallet,
                        anchorProgram: anchorProgram,
                        walletKeyPair: walletKeyPair,
                        splToken: splToken,
                        endSettings: endSettings,
                        hiddenSettings: hiddenSettings,
                        whitelistMintSettings: whitelistMintSettings,
                        goLiveDate: goLiveDate,
                        uuid: uuid,
                        arweaveJwk: arweaveJwk
                    })];
            case 4:
                _c.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _c.sent();
                loglevel_1["default"].warn('upload was not successful, please re-run.', err_1);
                process.exit(1);
                return [3 /*break*/, 6];
            case 6:
                endMs = Date.now();
                timeTaken = new Date(endMs - startMs).toISOString().substr(11, 8);
                loglevel_1["default"].info("ended at: ".concat(new Date(endMs).toISOString(), ". time taken: ").concat(timeTaken));
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
programCommand('withdraw')
    .option('-d ,--dry', 'Show Candy Machine withdraw amount without withdrawing.')
    .option('-ch, --charity <string>', 'Which charity?', '')
    .option('-cp, --charityPercent <string>', 'Which percent to charity?', '0')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, dry, charity, charityPercent, rpcUrl, walletKeyPair, anchorProgram, configOrCommitment, machines, t, cg, totalValue, cpf, charityPub, donation, errors, _i, machines_1, cg, tx, e_1, successCount, richness;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, dry = _a.dry, charity = _a.charity, charityPercent = _a.charityPercent, rpcUrl = _a.rpcUrl;
                if (charityPercent < 0 || charityPercent > 100) {
                    loglevel_1["default"].error('Charity percentage needs to be between 0 and 100');
                    return [2 /*return*/];
                }
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _b.sent();
                configOrCommitment = {
                    commitment: 'confirmed',
                    filters: [
                        {
                            memcmp: {
                                offset: 8,
                                bytes: walletKeyPair.publicKey.toBase58()
                            }
                        },
                    ]
                };
                return [4 /*yield*/, (0, accounts_1.getProgramAccounts)(anchorProgram.provider.connection, constants_1.CANDY_MACHINE_PROGRAM_V2_ID.toBase58(), configOrCommitment)];
            case 2:
                machines = _b.sent();
                t = 0;
                for (cg in machines) {
                    t += machines[cg].account.lamports;
                }
                totalValue = t / web3_js_1.LAMPORTS_PER_SOL;
                cpf = parseFloat(charityPercent);
                loglevel_1["default"].info("Total Number of Candy Machine Config Accounts to drain ".concat(machines.length));
                loglevel_1["default"].info("".concat(totalValue, " SOL locked up in configs"));
                if (!!charity && charityPercent > 0) {
                    donation = totalValue * (100 / charityPercent);
                    charityPub = new web3_js_1.PublicKey(charity);
                    loglevel_1["default"].info("Of that ".concat(totalValue, " SOL, ").concat(donation, " will be donated to ").concat(charity, ". Thank you!"));
                }
                if (!!dry) return [3 /*break*/, 10];
                errors = [];
                loglevel_1["default"].info('WARNING: This command will drain ALL of the Candy Machine config accounts that are owned by your current KeyPair, this will break your Candy Machine if its still in use');
                _i = 0, machines_1 = machines;
                _b.label = 3;
            case 3:
                if (!(_i < machines_1.length)) return [3 /*break*/, 9];
                cg = machines_1[_i];
                _b.label = 4;
            case 4:
                _b.trys.push([4, 7, , 8]);
                if (!(cg.account.lamports > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, withdraw_1.withdrawV2)(anchorProgram, walletKeyPair, env, new web3_js_1.PublicKey(cg.pubkey), cg.account.lamports, charityPub, cpf)];
            case 5:
                tx = _b.sent();
                loglevel_1["default"].info("".concat(cg.pubkey, " has been withdrawn. \nTransaction Signature: ").concat(tx));
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_1 = _b.sent();
                loglevel_1["default"].error("Withdraw has failed for config account ".concat(cg.pubkey, " Error: ").concat(e_1.message));
                errors.push(e_1);
                return [3 /*break*/, 8];
            case 8:
                _i++;
                return [3 /*break*/, 3];
            case 9:
                successCount = machines.length - errors.length;
                richness = successCount === machines.length ? 'rich again' : 'kinda rich';
                loglevel_1["default"].info("Congratulations, ".concat(successCount, " config accounts have been successfully drained."));
                loglevel_1["default"].info("Now you ".concat(richness, ", please consider supporting Open Source developers."));
                _b.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); });
commander_1.program
    .command('verify_assets')
    .argument('<directory>', 'Directory containing images and metadata files named from 0-n', function (val) {
    return fs
        .readdirSync("".concat(val))
        .map(function (file) { return path.join(process.cwd(), val, file); });
})
    .option('-n, --number <number>', 'Number of images to upload')
    .action(function (files, options, cmd) {
    var number = cmd.opts().number;
    var startMs = Date.now();
    loglevel_1["default"].info('started at: ' + startMs.toString());
    (0, verifyTokenMetadata_1.verifyTokenMetadata)({ files: files, uploadElementsCount: number });
    var endMs = Date.now();
    var timeTaken = new Date(endMs - startMs).toISOString().substr(11, 8);
    loglevel_1["default"].info("ended at: ".concat(new Date(endMs).toString(), ". time taken: ").concat(timeTaken));
});
programCommand('verify_upload')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, env, keypair, rpcUrl, cacheName, cacheContent, walletKeyPair, anchorProgram, candyMachine, candyMachineObj, allGood, keys, lineCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), env = _a.env, keypair = _a.keypair, rpcUrl = _a.rpcUrl, cacheName = _a.cacheName;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _b.sent();
                return [4 /*yield*/, anchorProgram.provider.connection.getAccountInfo(new web3_js_1.PublicKey(cacheContent.program.candyMachine))];
            case 2:
                candyMachine = _b.sent();
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(new web3_js_1.PublicKey(cacheContent.program.candyMachine))];
            case 3:
                candyMachineObj = _b.sent();
                allGood = true;
                keys = Object.keys(cacheContent.items)
                    .filter(function (k) { return !cacheContent.items[k].verifyRun; })
                    .sort(function (a, b) { return Number(a) - Number(b); });
                console.log('Key size', keys.length);
                return [4 /*yield*/, Promise.all((0, various_1.chunks)(keys, 500).map(function (allIndexesInSlice) { return __awaiter(void 0, void 0, void 0, function () {
                        var i, key, thisSlice, name_1, uri, cacheItem;
                        return __generator(this, function (_a) {
                            for (i = 0; i < allIndexesInSlice.length; i++) {
                                // Save frequently.
                                if (i % 100 == 0)
                                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                                key = allIndexesInSlice[i];
                                loglevel_1["default"].info('Looking at key ', key);
                                thisSlice = candyMachine.data.slice(constants_1.CONFIG_ARRAY_START_V2 + 4 + constants_1.CONFIG_LINE_SIZE_V2 * key, constants_1.CONFIG_ARRAY_START_V2 + 4 + constants_1.CONFIG_LINE_SIZE_V2 * (key + 1));
                                name_1 = (0, various_1.fromUTF8Array)(__spreadArray([], thisSlice.slice(2, 34), true));
                                uri = (0, various_1.fromUTF8Array)(__spreadArray([], thisSlice.slice(40, 240), true));
                                cacheItem = cacheContent.items[key];
                                if (!name_1.match(cacheItem.name) || !uri.match(cacheItem.link)) {
                                    //leaving here for debugging reasons, but it's pretty useless. if the first upload fails - all others are wrong
                                    /*log.info(
                                        `Name (${name}) or uri (${uri}) didnt match cache values of (${cacheItem.name})` +
                                          `and (${cacheItem.link}). marking to rerun for image`,
                                        key,
                                      );*/
                                    cacheItem.onChain = false;
                                    allGood = false;
                                }
                                else {
                                    cacheItem.verifyRun = true;
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); }))];
            case 4:
                _b.sent();
                if (!allGood) {
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    throw new Error("not all NFTs checked out. check out logs above for details");
                }
                lineCount = new anchor.BN(candyMachine.data.slice(constants_1.CONFIG_ARRAY_START_V2, constants_1.CONFIG_ARRAY_START_V2 + 4), undefined, 'le');
                loglevel_1["default"].info("uploaded (".concat(lineCount.toNumber(), ") out of (").concat(candyMachineObj.data.itemsAvailable, ")"));
                if (candyMachineObj.data.itemsAvailable > lineCount.toNumber()) {
                    throw new Error("predefined number of NFTs (".concat(candyMachineObj.data.itemsAvailable, ") is smaller than the uploaded one (").concat(lineCount.toNumber(), ")"));
                }
                else {
                    loglevel_1["default"].info('ready to deploy!');
                }
                (0, cache_1.saveCache)(cacheName, env, cacheContent);
                return [2 /*return*/];
        }
    });
}); });
programCommand('verify_price')
    .requiredOption('-p, --price <string>')
    .option('--cache-path <string>')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, price, cacheName, rpcUrl, cachePath, lamports, cacheContent, walletKeyPair, anchorProgram, candyAddress, machine, candyMachineLamports;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, price = _a.price, cacheName = _a.cacheName, rpcUrl = _a.rpcUrl, cachePath = _a.cachePath;
                lamports = (0, various_1.parsePrice)(price);
                if (isNaN(lamports)) {
                    return [2 /*return*/, loglevel_1["default"].error("verify_price requires a valid --price to be set")];
                }
                loglevel_1["default"].info("Expected price is: ".concat(lamports));
                cacheContent = (0, cache_1.loadCache)(cacheName, env, cachePath);
                if (!cacheContent) {
                    return [2 /*return*/, loglevel_1["default"].error("No cache found, can't continue. Make sure you are in the correct directory where the assets are located or use the --cache-path option.")];
                }
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _b.sent();
                candyAddress = new web3_js_1.PublicKey(cacheContent.program.candyMachine);
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyAddress)];
            case 2:
                machine = _b.sent();
                candyMachineLamports = machine.data.price.toNumber();
                loglevel_1["default"].info("Candymachine price is: ".concat(candyMachineLamports));
                if (lamports != candyMachineLamports) {
                    throw new Error("Expected price and CandyMachine's price do not match!");
                }
                loglevel_1["default"].info("Good to go!");
                return [2 /*return*/];
        }
    });
}); });
programCommand('show')
    .option('--cache-path <string>')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, rpcUrl, cachePath, cacheContent, walletKeyPair, anchorProgram, machine, e_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, rpcUrl = _a.rpcUrl, cachePath = _a.cachePath;
                cacheContent = (0, cache_1.loadCache)(cacheName, env, cachePath);
                if (!cacheContent) {
                    return [2 /*return*/, loglevel_1["default"].error("No cache found, can't continue. Make sure you are in the correct directory where the assets are located or use the --cache-path option.")];
                }
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(cacheContent.program.candyMachine)];
            case 3:
                machine = _c.sent();
                loglevel_1["default"].info('...Candy Machine...');
                loglevel_1["default"].info('Key:', cacheContent.program.candyMachine);
                //@ts-ignore
                loglevel_1["default"].info('authority: ', machine.authority.toBase58());
                //@ts-ignore
                loglevel_1["default"].info('wallet: ', machine.wallet.toBase58());
                //@ts-ignore
                loglevel_1["default"].info('tokenMint: ', 
                //@ts-ignore
                machine.tokenMint ? machine.tokenMint.toBase58() : null);
                //@ts-ignore
                loglevel_1["default"].info('uuid: ', machine.data.uuid);
                //@ts-ignore
                loglevel_1["default"].info('price: ', machine.data.price.toNumber());
                //@ts-ignore
                loglevel_1["default"].info('itemsAvailable: ', machine.data.itemsAvailable.toNumber());
                //@ts-ignore
                loglevel_1["default"].info('itemsRedeemed: ', machine.itemsRedeemed.toNumber());
                loglevel_1["default"].info('goLiveDate: ', 
                //@ts-ignore
                machine.data.goLiveDate
                    ? //@ts-ignore
                        new Date(machine.data.goLiveDate * 1000)
                    : 'N/A');
                //@ts-ignore
                loglevel_1["default"].info('symbol: ', machine.data.symbol);
                //@ts-ignore
                loglevel_1["default"].info('sellerFeeBasisPoints: ', machine.data.sellerFeeBasisPoints);
                //@ts-ignore
                loglevel_1["default"].info('creators: ');
                //@ts-ignore
                machine.data.creators.map(function (c) {
                    return loglevel_1["default"].info(c.address.toBase58(), 'at', c.share, '%');
                }),
                    //@ts-ignore
                    loglevel_1["default"].info('maxSupply: ', machine.data.maxSupply.toNumber());
                //@ts-ignore
                loglevel_1["default"].info('retainAuthority: ', machine.data.retainAuthority);
                //@ts-ignore
                loglevel_1["default"].info('isMutable: ', machine.data.isMutable);
                //@ts-ignore
                loglevel_1["default"].info('hidden settings: ', machine.data.hiddenSettings);
                if (machine.data.endSettings) {
                    loglevel_1["default"].info('End settings: ');
                    if (machine.data.endSettings.endSettingType.date) {
                        //@ts-ignore
                        loglevel_1["default"].info('End on', new Date(machine.data.endSettings.number * 1000));
                    }
                    else {
                        loglevel_1["default"].info('End when', machine.data.endSettings.number.toNumber(), 'sold');
                    }
                }
                else {
                    loglevel_1["default"].info('No end settings detected');
                }
                if (machine.data.gatekeeper) {
                    loglevel_1["default"].info('Captcha settings:');
                    loglevel_1["default"].info('Gatekeeper:', machine.data.gatekeeper.gatekeeperNetwork.toBase58());
                    loglevel_1["default"].info('Expires on use:', machine.data.gatekeeper.expireOnUse);
                }
                else {
                    loglevel_1["default"].info('No captcha for this candy machine');
                }
                if (machine.data.whitelistMintSettings) {
                    //@ts-ignore
                    loglevel_1["default"].info('whitelist settings: ');
                    //@ts-ignore
                    loglevel_1["default"].info('Mint: ', machine.data.whitelistMintSettings.mint.toBase58());
                    //@ts-ignore
                    loglevel_1["default"].info('Mode: ', machine.data.whitelistMintSettings.mode);
                    //@ts-ignore
                    loglevel_1["default"].info('Presale: ', machine.data.whitelistMintSettings.presale);
                    //@ts-ignore
                    loglevel_1["default"].info('Discounted Price: ', ((_b = machine.data.whitelistMintSettings.discountPrice) === null || _b === void 0 ? void 0 : _b.toNumber()) || 'N/A');
                }
                else {
                    loglevel_1["default"].info('no whitelist settings');
                }
                return [3 /*break*/, 5];
            case 4:
                e_2 = _c.sent();
                console.error(e_2);
                console.log('No machine found');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
programCommand('update_candy_machine')
    .requiredOption('-cp, --config-path <string>', 'JSON file with candy machine settings')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .option('--new-authority <Pubkey>', 'New Authority. Base58-encoded')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, rpcUrl, configPath, newAuthority, cacheName, cacheContent, newAuthorityKey, walletKeyPair, anchorProgram, candyMachine, candyMachineObj, _b, number, retainAuthority, mutable, price, splToken, treasuryWallet, gatekeeper, endSettings, hiddenSettings, whitelistMintSettings, goLiveDate, uuid, newSettings, remainingAccounts, tx, tx_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, rpcUrl = _a.rpcUrl, configPath = _a.configPath, newAuthority = _a.newAuthority, cacheName = _a.cacheName;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                newAuthorityKey = newAuthority ? new web3_js_1.PublicKey(newAuthority) : null;
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _c.sent();
                candyMachine = new web3_js_1.PublicKey(cacheContent.program.candyMachine);
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyMachine)];
            case 2:
                candyMachineObj = _c.sent();
                return [4 /*yield*/, (0, various_1.getCandyMachineV2Config)(walletKeyPair, anchorProgram, configPath)];
            case 3:
                _b = _c.sent(), number = _b.number, retainAuthority = _b.retainAuthority, mutable = _b.mutable, price = _b.price, splToken = _b.splToken, treasuryWallet = _b.treasuryWallet, gatekeeper = _b.gatekeeper, endSettings = _b.endSettings, hiddenSettings = _b.hiddenSettings, whitelistMintSettings = _b.whitelistMintSettings, goLiveDate = _b.goLiveDate, uuid = _b.uuid;
                newSettings = {
                    itemsAvailable: number
                        ? new anchor.BN(number)
                        : candyMachineObj.data.itemsAvailable,
                    uuid: uuid || candyMachineObj.data.uuid,
                    symbol: candyMachineObj.data.symbol,
                    sellerFeeBasisPoints: candyMachineObj.data.sellerFeeBasisPoints,
                    isMutable: mutable,
                    maxSupply: new anchor.BN(0),
                    retainAuthority: retainAuthority,
                    gatekeeper: gatekeeper,
                    goLiveDate: goLiveDate,
                    endSettings: endSettings,
                    price: price,
                    whitelistMintSettings: whitelistMintSettings,
                    hiddenSettings: hiddenSettings,
                    creators: candyMachineObj.data.creators.map(function (creator) {
                        return {
                            address: new web3_js_1.PublicKey(creator.address),
                            verified: true,
                            share: creator.share
                        };
                    })
                };
                remainingAccounts = [];
                if (splToken) {
                    remainingAccounts.push({
                        pubkey: splToken,
                        isSigner: false,
                        isWritable: false
                    });
                }
                return [4 /*yield*/, anchorProgram.rpc.updateCandyMachine(newSettings, {
                        accounts: {
                            candyMachine: candyMachine,
                            authority: walletKeyPair.publicKey,
                            wallet: treasuryWallet
                        },
                        remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined
                    })];
            case 4:
                tx = _c.sent();
                cacheContent.startDate = goLiveDate;
                loglevel_1["default"].info('update_candy_machine finished', tx);
                if (!newAuthorityKey) return [3 /*break*/, 6];
                return [4 /*yield*/, anchorProgram.rpc.updateAuthority(newAuthorityKey, {
                        accounts: {
                            candyMachine: candyMachine,
                            authority: walletKeyPair.publicKey,
                            wallet: treasuryWallet
                        }
                    })];
            case 5:
                tx_1 = _c.sent();
                cacheContent.authority = newAuthorityKey.toBase58();
                loglevel_1["default"].info(" - updated authority: ".concat(newAuthorityKey.toBase58()));
                loglevel_1["default"].info('update_authority finished', tx_1);
                _c.label = 6;
            case 6:
                (0, cache_1.saveCache)(cacheName, env, cacheContent);
                return [2 /*return*/];
        }
    });
}); });
programCommand('mint_one_token')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, rpcUrl, cacheContent, candyMachine, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, rpcUrl = _a.rpcUrl;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                candyMachine = new web3_js_1.PublicKey(cacheContent.program.candyMachine);
                return [4 /*yield*/, (0, mint_1.mintV2)(keypair, env, candyMachine, rpcUrl)];
            case 1:
                tx = _b.sent();
                loglevel_1["default"].info('mint_one_token finished', tx);
                return [2 /*return*/];
        }
    });
}); });
programCommand('mint_multiple_tokens')
    .requiredOption('-n, --number <string>', 'Number of tokens')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (_, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, number, rpcUrl, NUMBER_OF_NFTS_TO_MINT, cacheContent, candyMachine, mintToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, number = _a.number, rpcUrl = _a.rpcUrl;
                NUMBER_OF_NFTS_TO_MINT = parseInt(number, 10);
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                candyMachine = new web3_js_1.PublicKey(cacheContent.program.candyMachine);
                loglevel_1["default"].info("Minting ".concat(NUMBER_OF_NFTS_TO_MINT, " tokens..."));
                mintToken = function (index) { return __awaiter(void 0, void 0, void 0, function () {
                    var tx;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, mint_1.mintV2)(keypair, env, candyMachine, rpcUrl)];
                            case 1:
                                tx = _a.sent();
                                loglevel_1["default"].info("transaction ".concat(index + 1, " complete"), tx);
                                if (!(index < NUMBER_OF_NFTS_TO_MINT - 1)) return [3 /*break*/, 3];
                                loglevel_1["default"].info('minting another token...');
                                return [4 /*yield*/, mintToken(index + 1)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, mintToken(0)];
            case 1:
                _b.sent();
                loglevel_1["default"].info("minted ".concat(NUMBER_OF_NFTS_TO_MINT, " tokens"));
                loglevel_1["default"].info('mint_multiple_tokens finished');
                return [2 /*return*/];
        }
    });
}); });
programCommand('sign')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .requiredOption('-m, --metadata <string>', 'base58 metadata account id')
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, rpcUrl, metadata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, rpcUrl = _a.rpcUrl, metadata = _a.metadata;
                return [4 /*yield*/, (0, sign_1.signMetadata)(metadata, keypair, env, rpcUrl)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
programCommand('sign_all')
    .option('-b, --batch-size <string>', 'Batch size', '10')
    .option('-d, --daemon', 'Run signing continuously', false)
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, rpcUrl, batchSize, daemon, cacheContent, walletKeyPair, anchorProgram, batchSizeParsed, candyMachineId, candyMachineAddr;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, rpcUrl = _a.rpcUrl, batchSize = _a.batchSize, daemon = _a.daemon;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _b.sent();
                batchSizeParsed = parseInt(batchSize);
                if (!parseInt(batchSize)) {
                    throw new Error('Batch size needs to be an integer!');
                }
                candyMachineId = new web3_js_1.PublicKey(cacheContent.program.candyMachine);
                return [4 /*yield*/, (0, accounts_1.deriveCandyMachineV2ProgramAddress)(candyMachineId)];
            case 2:
                candyMachineAddr = (_b.sent())[0];
                loglevel_1["default"].debug('Creator pubkey: ', walletKeyPair.publicKey.toBase58());
                loglevel_1["default"].debug('Environment: ', env);
                loglevel_1["default"].debug('Candy machine address: ', cacheContent.program.candyMachine);
                loglevel_1["default"].debug('Batch Size: ', batchSizeParsed);
                return [4 /*yield*/, (0, signAll_1.signAllMetadataFromCandyMachine)(anchorProgram.provider.connection, walletKeyPair, candyMachineAddr.toBase58(), batchSizeParsed, daemon)];
            case 3:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
programCommand('update_existing_nfts_from_latest_cache_file')
    .option('-b, --batch-size <string>', 'Batch size', '2')
    .option('-nc, --new-cache <string>', 'Path to new updated cache file')
    .option('-d, --daemon', 'Run updating continuously', false)
    .option('-r, --rpc-url <string>', 'custom rpc url since this is a heavy command')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, rpcUrl, batchSize, daemon, newCache, cacheContent, newCacheContent, walletKeyPair, anchorProgram, candyAddress, batchSizeParsed;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, rpcUrl = _a.rpcUrl, batchSize = _a.batchSize, daemon = _a.daemon, newCache = _a.newCache;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                newCacheContent = (0, cache_1.loadCache)(newCache, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env, rpcUrl)];
            case 1:
                anchorProgram = _b.sent();
                candyAddress = cacheContent.program.candyMachine;
                batchSizeParsed = parseInt(batchSize);
                if (!parseInt(batchSize)) {
                    throw new Error('Batch size needs to be an integer!');
                }
                loglevel_1["default"].debug('Creator pubkey: ', walletKeyPair.publicKey.toBase58());
                loglevel_1["default"].debug('Environment: ', env);
                loglevel_1["default"].debug('Candy machine address: ', candyAddress);
                loglevel_1["default"].debug('Batch Size: ', batchSizeParsed);
                return [4 /*yield*/, (0, updateFromCache_1.updateFromCache)(anchorProgram.provider.connection, walletKeyPair, candyAddress, batchSizeParsed, daemon, cacheContent, newCacheContent)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
// can then upload these
programCommand('randomize_unminted_nfts_in_new_cache_file').action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, cacheContent, walletKeyPair, anchorProgram, candyAddress, candyMachine, itemsRedeemed, keys, shuffledKeys, newItems, i;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env)];
            case 1:
                anchorProgram = _b.sent();
                candyAddress = cacheContent.program.candyMachine;
                loglevel_1["default"].debug('Creator pubkey: ', walletKeyPair.publicKey.toBase58());
                loglevel_1["default"].debug('Environment: ', env);
                loglevel_1["default"].debug('Candy machine address: ', candyAddress);
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyAddress)];
            case 2:
                candyMachine = _b.sent();
                itemsRedeemed = candyMachine.itemsRedeemed;
                loglevel_1["default"].info('Randomizing one later than', itemsRedeemed.toNumber());
                keys = Object.keys(cacheContent.items).filter(function (k) { return parseInt(k) > itemsRedeemed; });
                shuffledKeys = (0, various_1.shuffle)(keys.slice());
                newItems = {};
                for (i = 0; i < keys.length; i++) {
                    newItems[keys[i].toString()] =
                        cacheContent.items[shuffledKeys[i].toString()];
                    loglevel_1["default"].debug('Setting ', keys[i], 'to ', shuffledKeys[i]);
                    newItems[keys[i].toString()].onChain = false;
                }
                fs.writeFileSync('.cache/' + env + '-' + cacheName + '-randomized', JSON.stringify(__assign(__assign({}, cacheContent), { items: __assign(__assign({}, cacheContent.items), newItems) })));
                return [2 /*return*/];
        }
    });
}); });
programCommand('get_all_mint_addresses').action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, env, cacheName, keypair, cacheContent, walletKeyPair, anchorProgram, candyMachineId, candyMachineAddr, accountsByCreatorAddress, addresses;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), env = _a.env, cacheName = _a.cacheName, keypair = _a.keypair;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(walletKeyPair, env)];
            case 1:
                anchorProgram = _b.sent();
                candyMachineId = new web3_js_1.PublicKey(cacheContent.program.candyMachine);
                return [4 /*yield*/, (0, accounts_1.deriveCandyMachineV2ProgramAddress)(candyMachineId)];
            case 2:
                candyMachineAddr = (_b.sent())[0];
                return [4 /*yield*/, (0, signAll_1.getAccountsByCreatorAddress)(candyMachineAddr.toBase58(), anchorProgram.provider.connection)];
            case 3:
                accountsByCreatorAddress = _b.sent();
                addresses = accountsByCreatorAddress.map(function (it) {
                    return new web3_js_1.PublicKey(it[0].mint).toBase58();
                });
                console.log(JSON.stringify(addresses, null, 2));
                return [2 /*return*/];
        }
    });
}); });
commander_1.program
    .command('generate_art_configurations')
    .argument('<directory>', 'Directory containing traits named from 0-n', function (val) {
    return fs.readdirSync("".concat(val));
})
    .action(function (files) { return __awaiter(void 0, void 0, void 0, function () {
    var startMs, successful, endMs, timeTaken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loglevel_1["default"].info('creating traits configuration file');
                startMs = Date.now();
                return [4 /*yield*/, (0, generateConfigurations_1.generateConfigurations)(files)];
            case 1:
                successful = _a.sent();
                endMs = Date.now();
                timeTaken = new Date(endMs - startMs).toISOString().substr(11, 8);
                if (successful) {
                    loglevel_1["default"].info('traits-configuration.json has been created!');
                    loglevel_1["default"].info("ended at: ".concat(new Date(endMs).toISOString(), ". time taken: ").concat(timeTaken));
                }
                else {
                    loglevel_1["default"].info('The art configuration file was not created');
                }
                return [2 /*return*/];
        }
    });
}); });
commander_1.program
    .command('create_generative_art')
    .option('-n, --number-of-images <string>', 'Number of images to be generated', '100')
    .option('-c, --config-location <string>', 'Location of the traits configuration file', './traits-configuration.json')
    .option('-o, --output-location <string>', 'If you wish to do image generation elsewhere, skip it and dump randomized sets to file')
    .option('-ta, --treat-attributes-as-file-names <string>', 'If your attributes are filenames, trim the .png off if set to true')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, numberOfImages, configLocation, outputLocation, treatAttributesAsFileNames, randomSets;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), numberOfImages = _a.numberOfImages, configLocation = _a.configLocation, outputLocation = _a.outputLocation, treatAttributesAsFileNames = _a.treatAttributesAsFileNames;
                loglevel_1["default"].info('Loaded configuration file');
                return [4 /*yield*/, (0, metadata_1.createMetadataFiles)(numberOfImages, configLocation, treatAttributesAsFileNames == 'true')];
            case 1:
                randomSets = _b.sent();
                loglevel_1["default"].info('JSON files have been created within the assets directory');
                if (!!outputLocation) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, createArt_1.createGenerativeArt)(configLocation, randomSets)];
            case 2:
                _b.sent();
                loglevel_1["default"].info('Images have been created successfully!');
                return [3 /*break*/, 4];
            case 3:
                fs.writeFileSync(outputLocation, JSON.stringify(randomSets));
                loglevel_1["default"].info('Traits written!');
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
function programCommand(name) {
    return commander_1.program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .requiredOption('-k, --keypair <path>', "Solana wallet location")
        .option('-l, --log-level <string>', 'log level', setLogLevel)
        .option('-c, --cache-name <string>', 'Cache file name', 'temp');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLogLevel(value, prev) {
    if (value === undefined || value === null) {
        return;
    }
    loglevel_1["default"].info('setting the log value to: ' + value);
    loglevel_1["default"].setLevel(value);
}
commander_1.program.parse(process.argv);
