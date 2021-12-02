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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalForageItemList = void 0;
var react_1 = require("react");
var functions_1 = __importDefault(require("./functions"));
/**
 * Hook of localForage getItem in form of list
 * @param key Array of key of data looking for.
 * @param table Table's name where data exists.
 * @param db_name (Optional) DB's name
 * @param REAL_TIME (Optional) If it's false or undefined, it changes its state when function get all data in key list, if it's true, it changes its state when every time get data in key list.
 * @returns [data, loading]. data : Array of value of data in type of Key-Value, default is [], loading: Loading state, control render function with this.
 */
function useLocalForageItemList(keys, table, db_name, REAL_TIME) {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        setData([]);
        setLoading(true);
        function get(key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, functions_1.default.getDBItem(table, key, db_name)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        function getList() {
            return __awaiter(this, void 0, void 0, function () {
                var newValue, _loop_1, _i, keys_1, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (REAL_TIME !== undefined && REAL_TIME === true)
                                setLoading(false);
                            newValue = [];
                            _loop_1 = function (key) {
                                var currentData, inputData;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, get(key)];
                                        case 1:
                                            currentData = _b.sent();
                                            inputData = { key: key, value: currentData };
                                            newValue.push(inputData);
                                            // if REAL_TIME = true, then change its state every time
                                            if (REAL_TIME !== undefined && REAL_TIME === true) {
                                                setData(function (prev) {
                                                    return __spreadArray(__spreadArray([], prev, true), [inputData], false);
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, keys_1 = keys;
                            _a.label = 1;
                        case 1:
                            if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                            key = keys_1[_i];
                            return [5 /*yield**/, _loop_1(key)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, newValue];
                    }
                });
            });
        }
        getList().then(function (newValue) {
            setData(newValue);
            setLoading(false);
        });
    }, [keys.toLocaleString(), table, db_name, REAL_TIME]);
    return [data, loading];
}
exports.useLocalForageItemList = useLocalForageItemList;
