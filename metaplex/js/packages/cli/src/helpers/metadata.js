'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.createMetadataFiles =
  exports.TRAITS_DIRECTORY =
  exports.ASSETS_DIRECTORY =
    void 0;
var fs_1 = require('fs');
var loglevel_1 = require('loglevel');
var lodash_1 = require('lodash');
var various_1 = require('./various');
var _a = fs_1.promises,
  writeFile = _a.writeFile,
  mkdir = _a.mkdir;
exports.ASSETS_DIRECTORY = './assets';
exports.TRAITS_DIRECTORY = './traits';
function createMetadataFiles(
  numberOfImages,
  configLocation,
  treatAttributesAsFileNames,
) {
  return __awaiter(this, void 0, void 0, function () {
    var numberOfFilesCreated,
      randomizedSets,
      err_1,
      _a,
      breakdown,
      name,
      symbol,
      creators,
      description,
      seller_fee_basis_points,
      collection,
      dnp,
      premadeCustoms,
      randomizedSet,
      shuffled,
      i,
      metadata,
      err_2,
      randomSetWithIds;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          numberOfFilesCreated = 0;
          randomizedSets = [];
          if (!!fs_1.existsSync(exports.ASSETS_DIRECTORY))
            return [3 /*break*/, 4];
          _b.label = 1;
        case 1:
          _b.trys.push([1, 3, , 4]);
          return [4 /*yield*/, mkdir(exports.ASSETS_DIRECTORY)];
        case 2:
          _b.sent();
          return [3 /*break*/, 4];
        case 3:
          err_1 = _b.sent();
          loglevel_1['default'].error(
            'unable to create assets directory',
            err_1,
          );
          return [3 /*break*/, 4];
        case 4:
          return [4 /*yield*/, (0, various_1.readJsonFile)(configLocation)];
        case 5:
          (_a = _b.sent()),
            (breakdown = _a.breakdown),
            (name = _a.name),
            (symbol = _a.symbol),
            (creators = _a.creators),
            (description = _a.description),
            (seller_fee_basis_points = _a.seller_fee_basis_points),
            (collection = _a.collection),
            (dnp = _a.dnp),
            (premadeCustoms = _a.premadeCustoms);
          while (numberOfFilesCreated < premadeCustoms.length) {
            randomizedSets.push(premadeCustoms[numberOfFilesCreated]);
            numberOfFilesCreated += 1;
          }
          while (numberOfFilesCreated < parseInt(numberOfImages, 10)) {
            randomizedSet = (0, various_1.generateRandomSet)(breakdown, dnp);
            if (!lodash_1['default'].some(randomizedSets, randomizedSet)) {
              randomizedSets.push(randomizedSet);
              numberOfFilesCreated += 1;
            }
          }
          shuffled = (0, various_1.shuffle)(randomizedSets);
          i = 0;
          _b.label = 6;
        case 6:
          if (!(i < shuffled.length)) return [3 /*break*/, 11];
          metadata = (0, various_1.getMetadata)(
            name,
            symbol,
            i,
            creators,
            description,
            seller_fee_basis_points,
            shuffled[i],
            collection,
            treatAttributesAsFileNames,
          );
          _b.label = 7;
        case 7:
          _b.trys.push([7, 9, , 10]);
          return [
            4 /*yield*/,
            writeFile(
              ''.concat(exports.ASSETS_DIRECTORY, '/').concat(i, '.json'),
              JSON.stringify(metadata),
            ),
          ];
        case 8:
          _b.sent();
          return [3 /*break*/, 10];
        case 9:
          err_2 = _b.sent();
          loglevel_1['default'].error(
            ''.concat(numberOfFilesCreated, ' failed to get created'),
            err_2,
          );
          return [3 /*break*/, 10];
        case 10:
          i++;
          return [3 /*break*/, 6];
        case 11:
          randomSetWithIds = shuffled.map(function (item, index) {
            return __assign({ id: index + 1 }, item);
          });
          return [2 /*return*/, randomSetWithIds];
      }
    });
  });
}
exports.createMetadataFiles = createMetadataFiles;
