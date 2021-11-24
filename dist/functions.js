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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var localforage_1 = __importDefault(require("localforage"));
var ReactLF = /** @class */ (function () {
    function ReactLF() {
    }
    /**
     * Get Database from Local Forage
     * @param DB_NAME (optional) DB's name, usually use one DB_NAME by one Security origin
     * @param TABLE_NAME Table name, contains key-value data
     * @param driver (optional) Array of driver type INDEXEDDB, LOCALSTORAGE, LOCALSTORAGE, WEBSQL
     * @returns LocalForage Instance
     */
    ReactLF.getDataBase = function (TABLE_NAME, DB_NAME, driver) {
        var DATA_BASE_NAME_CONST = DB_NAME === undefined ? this.INITIAL_DB_NAME : DB_NAME;
        if (!Object.keys(this.db).includes(DATA_BASE_NAME_CONST)) {
            this.db[DATA_BASE_NAME_CONST] = {};
        }
        var DATA_BASE = this.db[DATA_BASE_NAME_CONST];
        if (DATA_BASE !== undefined && Object.keys(DATA_BASE).includes(TABLE_NAME)) {
            return DATA_BASE[TABLE_NAME];
        }
        else {
            var database = localforage_1.default.createInstance({
                name: DB_NAME ? DB_NAME : this.INITIAL_DB_NAME,
                storeName: TABLE_NAME,
                driver: driver ? driver : [localforage_1.default.INDEXEDDB, localforage_1.default.LOCALSTORAGE, localforage_1.default.WEBSQL],
            });
            DATA_BASE[TABLE_NAME] = database;
            return database;
        }
    };
    var _a;
    _a = ReactLF;
    // default db name
    ReactLF.INITIAL_DB_NAME = "DATABASE";
    // db map
    ReactLF.db = {
        DATABASE: {},
    };
    /**
     * Set Default DataBase name
     * @param name database name, if name is null, do not change name
     */
    ReactLF.setDefaultDbName = function (name) {
        if (name === null) {
            return;
        }
        else {
            _a.INITIAL_DB_NAME = name;
        }
    };
    /**
     * Set item into table.
     * @param TABLE_NAME Table's name where put data in.
     * @param KEY Key of data
     * @param VALUE Value of data
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    ReactLF.setDBItem = function (TABLE_NAME, KEY, VALUE, DB_NAME) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).setItem(KEY, VALUE)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * Get item from table
     * @param TABLE_NAME Table's name where get data from.
     * @param KEY Key of data.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<AvailableObject | null>, Returns Localforage's available object as value, if there's no match key in table then returns null
     */
    ReactLF.getDBItem = function (TABLE_NAME, KEY, DB_NAME) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).getItem(KEY)];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    /**
     * Get Table's Length
     * @param TABLE_NAME Table's name where get length from.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<number>, Length of table.
     */
    ReactLF.getDBLength = function (TABLE_NAME, DB_NAME) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).length()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    /**
     * Get table's key array
     * @param TABLE_NAME Table's name where get all keys from.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<Array<string>>, Array of keys in table.
     */
    ReactLF.getAllDBKeys = function (TABLE_NAME, DB_NAME) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.getDataBase(TABLE_NAME, DB_NAME ? DB_NAME : this.INITIAL_DB_NAME).keys()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    /**
     * Set items of array in table.2
     * @param TABLE_NAME Table's name where put data in.
     * @param KV_ARRAY Key-Value Array of data
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    ReactLF.setDBBulkItem = function (TABLE_NAME, KV_ARRAY, DB_NAME) { return __awaiter(void 0, void 0, void 0, function () {
        var _i, KV_ARRAY_1, item;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, KV_ARRAY_1 = KV_ARRAY;
                    _b.label = 1;
                case 1:
                    if (!(_i < KV_ARRAY_1.length)) return [3 /*break*/, 4];
                    item = KV_ARRAY_1[_i];
                    return [4 /*yield*/, this.setDBItem(TABLE_NAME, item.key, item.value, DB_NAME)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Cleaning table's data.
     * @param TABLE_NAME Table's name where remove data.
     * @param DB_NAME (Optional) DB's name
     * @returns Promise<void>
     */
    ReactLF.cleanDB = function (TABLE_NAME, DB_NAME) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.getDataBase(TABLE_NAME, DB_NAME).clear()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return ReactLF;
}());
exports.default = ReactLF;
