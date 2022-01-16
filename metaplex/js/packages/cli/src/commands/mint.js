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
exports.mintV2 = exports.mint = void 0;
var web3_js_1 = require("@solana/web3.js");
var accounts_1 = require("../helpers/accounts");
var constants_1 = require("../helpers/constants");
var anchor = require("@project-serum/anchor");
var spl_token_1 = require("@solana/spl-token");
var instructions_1 = require("../helpers/instructions");
var transactions_1 = require("../helpers/transactions");
function mint(keypair, env, configAddress, uuid, rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var mint, userKeyPair, anchorProgram, userTokenAccountAddress, candyMachineAddress, candyMachine, remainingAccounts, signers, instructions, _a, _b, tokenAccount, transferAuthority, metadataAddress, masterEdition, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    mint = web3_js_1.Keypair.generate();
                    userKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                    return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(userKeyPair, env, rpcUrl)];
                case 1:
                    anchorProgram = _f.sent();
                    return [4 /*yield*/, (0, accounts_1.getTokenWallet)(userKeyPair.publicKey, mint.publicKey)];
                case 2:
                    userTokenAccountAddress = _f.sent();
                    return [4 /*yield*/, (0, accounts_1.getCandyMachineAddress)(configAddress, uuid)];
                case 3:
                    candyMachineAddress = (_f.sent())[0];
                    return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyMachineAddress)];
                case 4:
                    candyMachine = _f.sent();
                    remainingAccounts = [];
                    signers = [mint, userKeyPair];
                    _b = (_a = anchor.web3.SystemProgram).createAccount;
                    _e = {
                        fromPubkey: userKeyPair.publicKey,
                        newAccountPubkey: mint.publicKey,
                        space: spl_token_1.MintLayout.span
                    };
                    return [4 /*yield*/, anchorProgram.provider.connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span)];
                case 5:
                    instructions = [
                        _b.apply(_a, [(_e.lamports = _f.sent(),
                                _e.programId = constants_1.TOKEN_PROGRAM_ID,
                                _e)]),
                        spl_token_1.Token.createInitMintInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, 0, userKeyPair.publicKey, userKeyPair.publicKey),
                        (0, instructions_1.createAssociatedTokenAccountInstruction)(userTokenAccountAddress, userKeyPair.publicKey, userKeyPair.publicKey, mint.publicKey),
                        spl_token_1.Token.createMintToInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, userKeyPair.publicKey, [], 1)
                    ];
                    if (!candyMachine.tokenMint) return [3 /*break*/, 7];
                    transferAuthority = anchor.web3.Keypair.generate();
                    return [4 /*yield*/, (0, accounts_1.getTokenWallet)(userKeyPair.publicKey, candyMachine.tokenMint)];
                case 6:
                    tokenAccount = _f.sent();
                    remainingAccounts.push({
                        pubkey: tokenAccount,
                        isWritable: true,
                        isSigner: false
                    });
                    remainingAccounts.push({
                        pubkey: userKeyPair.publicKey,
                        isWritable: false,
                        isSigner: true
                    });
                    instructions.push(spl_token_1.Token.createApproveInstruction(constants_1.TOKEN_PROGRAM_ID, tokenAccount, transferAuthority.publicKey, userKeyPair.publicKey, [], candyMachine.data.price.toNumber()));
                    _f.label = 7;
                case 7: return [4 /*yield*/, (0, accounts_1.getMetadata)(mint.publicKey)];
                case 8:
                    metadataAddress = _f.sent();
                    return [4 /*yield*/, (0, accounts_1.getMasterEdition)(mint.publicKey)];
                case 9:
                    masterEdition = _f.sent();
                    _d = (_c = instructions).push;
                    return [4 /*yield*/, anchorProgram.instruction.mintNft({
                            accounts: {
                                config: configAddress,
                                candyMachine: candyMachineAddress,
                                payer: userKeyPair.publicKey,
                                //@ts-ignore
                                wallet: candyMachine.wallet,
                                mint: mint.publicKey,
                                metadata: metadataAddress,
                                masterEdition: masterEdition,
                                mintAuthority: userKeyPair.publicKey,
                                updateAuthority: userKeyPair.publicKey,
                                tokenMetadataProgram: constants_1.TOKEN_METADATA_PROGRAM_ID,
                                tokenProgram: constants_1.TOKEN_PROGRAM_ID,
                                systemProgram: web3_js_1.SystemProgram.programId,
                                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
                            },
                            remainingAccounts: remainingAccounts
                        })];
                case 10:
                    _d.apply(_c, [_f.sent()]);
                    if (tokenAccount) {
                        instructions.push(spl_token_1.Token.createRevokeInstruction(constants_1.TOKEN_PROGRAM_ID, tokenAccount, userKeyPair.publicKey, []));
                    }
                    return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, instructions, signers)];
                case 11: return [2 /*return*/, (_f.sent()).txid];
            }
        });
    });
}
exports.mint = mint;
function mintV2(keypair, env, candyMachineAddress, rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var mint, userKeyPair, anchorProgram, userTokenAccountAddress, candyMachine, remainingAccounts, signers, cleanupInstructions, instructions, _a, _b, mint_1, whitelistToken, whitelistBurnAuthority, exists, tokenAccount, transferAuthority, metadataAddress, masterEdition, _c, candyMachineCreator, creatorBump, _d, _e, finished;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    mint = web3_js_1.Keypair.generate();
                    userKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                    return [4 /*yield*/, (0, accounts_1.loadCandyProgramV2)(userKeyPair, env, rpcUrl)];
                case 1:
                    anchorProgram = _g.sent();
                    return [4 /*yield*/, (0, accounts_1.getTokenWallet)(userKeyPair.publicKey, mint.publicKey)];
                case 2:
                    userTokenAccountAddress = _g.sent();
                    return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyMachineAddress)];
                case 3:
                    candyMachine = _g.sent();
                    remainingAccounts = [];
                    signers = [mint, userKeyPair];
                    cleanupInstructions = [];
                    _b = (_a = anchor.web3.SystemProgram).createAccount;
                    _f = {
                        fromPubkey: userKeyPair.publicKey,
                        newAccountPubkey: mint.publicKey,
                        space: spl_token_1.MintLayout.span
                    };
                    return [4 /*yield*/, anchorProgram.provider.connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span)];
                case 4:
                    instructions = [
                        _b.apply(_a, [(_f.lamports = _g.sent(),
                                _f.programId = constants_1.TOKEN_PROGRAM_ID,
                                _f)]),
                        spl_token_1.Token.createInitMintInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, 0, userKeyPair.publicKey, userKeyPair.publicKey),
                        (0, instructions_1.createAssociatedTokenAccountInstruction)(userTokenAccountAddress, userKeyPair.publicKey, userKeyPair.publicKey, mint.publicKey),
                        spl_token_1.Token.createMintToInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, userKeyPair.publicKey, [], 1)
                    ];
                    if (!candyMachine.data.whitelistMintSettings) return [3 /*break*/, 7];
                    mint_1 = new anchor.web3.PublicKey(candyMachine.data.whitelistMintSettings.mint);
                    return [4 /*yield*/, (0, accounts_1.getAtaForMint)(mint_1, userKeyPair.publicKey)];
                case 5:
                    whitelistToken = (_g.sent())[0];
                    remainingAccounts.push({
                        pubkey: whitelistToken,
                        isWritable: true,
                        isSigner: false
                    });
                    if (!candyMachine.data.whitelistMintSettings.mode.burnEveryTime) return [3 /*break*/, 7];
                    whitelistBurnAuthority = anchor.web3.Keypair.generate();
                    remainingAccounts.push({
                        pubkey: mint_1,
                        isWritable: true,
                        isSigner: false
                    });
                    remainingAccounts.push({
                        pubkey: whitelistBurnAuthority.publicKey,
                        isWritable: false,
                        isSigner: true
                    });
                    signers.push(whitelistBurnAuthority);
                    return [4 /*yield*/, anchorProgram.provider.connection.getAccountInfo(whitelistToken)];
                case 6:
                    exists = _g.sent();
                    if (exists) {
                        instructions.push(spl_token_1.Token.createApproveInstruction(constants_1.TOKEN_PROGRAM_ID, whitelistToken, whitelistBurnAuthority.publicKey, userKeyPair.publicKey, [], 1));
                        cleanupInstructions.push(spl_token_1.Token.createRevokeInstruction(constants_1.TOKEN_PROGRAM_ID, whitelistToken, userKeyPair.publicKey, []));
                    }
                    _g.label = 7;
                case 7:
                    if (!candyMachine.tokenMint) return [3 /*break*/, 9];
                    transferAuthority = anchor.web3.Keypair.generate();
                    return [4 /*yield*/, (0, accounts_1.getTokenWallet)(userKeyPair.publicKey, candyMachine.tokenMint)];
                case 8:
                    tokenAccount = _g.sent();
                    remainingAccounts.push({
                        pubkey: tokenAccount,
                        isWritable: true,
                        isSigner: false
                    });
                    remainingAccounts.push({
                        pubkey: transferAuthority.publicKey,
                        isWritable: false,
                        isSigner: true
                    });
                    instructions.push(spl_token_1.Token.createApproveInstruction(constants_1.TOKEN_PROGRAM_ID, tokenAccount, transferAuthority.publicKey, userKeyPair.publicKey, [], candyMachine.data.price.toNumber()));
                    signers.push(transferAuthority);
                    cleanupInstructions.push(spl_token_1.Token.createRevokeInstruction(constants_1.TOKEN_PROGRAM_ID, tokenAccount, userKeyPair.publicKey, []));
                    _g.label = 9;
                case 9: return [4 /*yield*/, (0, accounts_1.getMetadata)(mint.publicKey)];
                case 10:
                    metadataAddress = _g.sent();
                    return [4 /*yield*/, (0, accounts_1.getMasterEdition)(mint.publicKey)];
                case 11:
                    masterEdition = _g.sent();
                    return [4 /*yield*/, (0, accounts_1.getCandyMachineCreator)(candyMachineAddress)];
                case 12:
                    _c = _g.sent(), candyMachineCreator = _c[0], creatorBump = _c[1];
                    _e = (_d = instructions).push;
                    return [4 /*yield*/, anchorProgram.instruction.mintNft(creatorBump, {
                            accounts: {
                                candyMachine: candyMachineAddress,
                                candyMachineCreator: candyMachineCreator,
                                payer: userKeyPair.publicKey,
                                //@ts-ignore
                                wallet: candyMachine.wallet,
                                mint: mint.publicKey,
                                metadata: metadataAddress,
                                masterEdition: masterEdition,
                                mintAuthority: userKeyPair.publicKey,
                                updateAuthority: userKeyPair.publicKey,
                                tokenMetadataProgram: constants_1.TOKEN_METADATA_PROGRAM_ID,
                                tokenProgram: constants_1.TOKEN_PROGRAM_ID,
                                systemProgram: web3_js_1.SystemProgram.programId,
                                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                                recentBlockhashes: anchor.web3.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
                                instructionSysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY
                            },
                            remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined
                        })];
                case 13:
                    _e.apply(_d, [_g.sent()]);
                    return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, instructions, signers)];
                case 14:
                    finished = (_g.sent()).txid;
                    return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, userKeyPair, cleanupInstructions, [])];
                case 15:
                    _g.sent();
                    return [2 /*return*/, finished];
            }
        });
    });
}
exports.mintV2 = mintV2;
